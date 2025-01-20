
from playwright.sync_api import sync_playwright
import re
import numpy as np

def weighted_regression(like_counts):
    if len(like_counts) == 0:
        return 0

    weights = np.exp(-np.arange(len(like_counts)))
    weighted_sum = np.sum(like_counts * weights)
    sum_of_weights = np.sum(weights)
    weighted_average = weighted_sum / sum_of_weights

    return int(round(weighted_average))


def scrape_social_data(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            page.goto(url, timeout=30000)
            page.wait_for_load_state("domcontentloaded")

            follower_meta = page.locator('meta[name="description"]').get_attribute("content")
           

            html_content = page.content()
            like_counts = re.findall(r'"like_count":(\d+)', html_content)
            like_counts = [int(count) for count in like_counts]

        except Exception as e:
            print(f"Error scraping data: {e}")
            follower_count = "0"
            like_counts = []

        finally:
            browser.close()

        return  like_counts


def engagement_predict(username):
    social_url = f"https://www.threads.net/@{username}"
    like_counts = scrape_social_data(social_url)
    predicted_likes = weighted_regression(like_counts) + 1
   
    return predicted_likes

#     print(predicted_likes)
#     print(follower_count)
#     print(followers)
#     print(like_counts)
# like_predict("ayushpathaniaaa")