import time
import sys
import random
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.PhantomJS()
search_query = sys.argv[1].replace(' ', '%20')

browser.get("https://www.pexels.com/search/" + search_query)

pic_arr = [];

photos = browser.find_elements_by_class_name("photo-item")

for photo in photos:
	img_elem = photo.find_element_by_tag_name("img")
	picture = img_elem.get_attribute("src")
	pic_arr.append(picture)

if not pic_arr:
	print('sorry we couldn\'t find anything =[')
else:
	print(random.choice(pic_arr), len(pic_arr))

sys.stdout.flush()
browser.quit()