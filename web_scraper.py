import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Chrome("./chromedriver")
browser.get("https://freephotos.cc/dogs")
time.sleep(1)

elem = browser.find_element_by_tag_name("body")

num_pagedown = 60

while num_pagedown:
	elem.send_keys(Keys.PAGE_DOWN)
	time.sleep(0.2)
	num_pagedown-=1

grid = browser.find_elements_by_class_name("grid-item")
file = open('dogs.txt', 'w')

for link in grid:
	a_elem = link.find_element_by_tag_name("a")
	picture = a_elem.get_attribute("data-download")
	file.write(picture + '\n')


file.close()
browser.quit()