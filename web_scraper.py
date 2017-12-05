import time
import sys
import random
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.PhantomJS()
search_query = sys.argv[1].replace(' ', '%20')

browser.get("https://imgur.com/search/relevance/all?q_exactly=" + search_query + "&q_type=png&q_all=")

pic_arr = [];

photos = browser.find_elements_by_class_name("post")

for photo in photos:
	img_elem = photo.find_element_by_tag_name("a")
	picture = img_elem.get_attribute("href")
	#picture = picture.replace("/gallery", "") + '.png'
	pic_arr.append(picture)

if not pic_arr:
	print('sorry we couldn\'t find anything =[')
else:
	print(random.choice(pic_arr))

sys.stdout.flush()
browser.quit()