import os
from pathlib import Path
#
from bs4 import BeautifulSoup


# shared config with javascript
MONSTER_ID_PREFIX = 'monster'
MONSTER_CLASS = 'monsterImg'

CONTAINER_DIV_ID = 'imgsContainer'

IMG_ELEM_TEMPLATE = '<img id="{eid}" class="{m_class} hidden" src="{img_path}" {size_constrain}>'

# paths
PROJECT_ROOT = Path(__file__).parent
IMAGES_REL_DIR = 'static/images/monsters'
IMAGES_DIR = PROJECT_ROOT / IMAGES_REL_DIR
TEMPLATE_HTML_PATH = PROJECT_ROOT / 'template.html'
INDEX_HTML_PATH = PROJECT_ROOT / 'index.html'


def generate_index_html():
	"""Generates `index.html` from a `template.html` file.

	Adds images into the div with `CONTAINER_DIV_ID` defined in `template.html`
	"""

	# --------------------------------------------------------------------
	# get img paths
	# --------------------------------------------------------------------
	# [] if no file
	img_names = next(os.walk(IMAGES_DIR), (None, None, []))[2]
	if not img_names:
		print(f'no images found in {IMAGES_DIR}')
		return
	img_rel_paths = [f'{IMAGES_REL_DIR}/{n}' for n in img_names]
	print(f'found: {img_rel_paths}')

	# --------------------------------------------------------------------
	# soup time
	# --------------------------------------------------------------------
	contents = None
	with open(TEMPLATE_HTML_PATH, encoding='utf-8') as f:
		contents = f.read()
	soup = BeautifulSoup(contents, 'html.parser')

	container = soup.find(id=CONTAINER_DIV_ID)
	container.clear()

	for i, path in enumerate(img_rel_paths):
		elem_str = IMG_ELEM_TEMPLATE.format(
			m_class=MONSTER_CLASS,
			eid=f'{MONSTER_ID_PREFIX}{i:02}',
			img_path=path,
			size_constrain=''  # TODO change based on orientation?
		)
		print(elem_str)
		container.append(BeautifulSoup(elem_str, 'html.parser'))

	print('RESULTS:')
	print(soup.prettify())

	# --------------------------------------------------------------------
	# output results
	# --------------------------------------------------------------------
	with open(INDEX_HTML_PATH, 'w', encoding='utf-8') as f:
		f.write(soup.prettify())

	print(f'wrote to {INDEX_HTML_PATH}')
	return

if __name__ == '__main__':
	generate_index_html()
