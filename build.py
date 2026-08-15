import os
from pathlib import Path


_IMG_ELEM_TEMPLATE = '<img id="{eid}" class="monsterImg hidden" src="{img_path}" {size_constrain}>'

# height=300


def generate_index_html():
	root = Path(__file__).parent

	# get img paths
	imgs_dir = root / 'imgs'
	img_names = next(os.walk(imgs_dir), (None, None, []))[2]  # [] if no file
	img_rel_paths = [f'imgs/{n}' for n in img_names]
	print(img_rel_paths)

	for path in img_rel_paths:
		elem = _IMG_ELEM_TEMPLATE.format(
			eid='', 
			img_path=img_rel_paths, 
			size_constrain='height=300'
		)

if __name__ == '__main__':
	generate_index_html()