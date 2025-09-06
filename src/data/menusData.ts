// app/data/menuData.ts
import { TopLevel } from '../types/navbar';

export const menuData: TopLevel[] = [
	{
		label: 'Outdoor Media',
		sections: [
			{
				heading: 'Sub-Categories',
				items: [
					{ label: 'Billboards', href: '/outdoor/billboards' },
					{ label: 'Hoardings', href: '/outdoor/hoardings' },
					{ label: 'Lamp Posts', href: '/outdoor/lamp-posts' },
					{ label: 'Bridge Faces', href: '/outdoor/bridge-faces' },
					{ label: 'Bus Shelters', href: '/outdoor/bus-shelters' },
					{ label: 'MUPIs', href: '/outdoor/mupis' },
					{ label: 'Building Facades', href: '/outdoor/building-facades' },
					{ label: 'Metro / Railway Stations', href: '/outdoor/metro-rail' },
					{ label: 'Malls', href: '/outdoor/malls' },
					{ label: 'Airports', href: '/outdoor/airports' }
				]
			},
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/outdoor/label-1' }, { label: 'Labels', href: '/outdoor/label-2' }] },
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/outdoor/label-3' }, { label: 'Labels', href: '/outdoor/label-4' }] }
		]
	},
	{
		label: 'Print Media',
		sections: [
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/print/labels-1' }, { label: 'Labels', href: '/print/labels-2' }] },
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/print/labels-3' }, { label: 'Labels', href: '/print/labels-4' }] },
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/print/labels-5' }, { label: 'Labels', href: '/print/labels-6' }] }
		]
	},
	{
		label: 'FM Radio',
		sections: [
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/fm/labels-1' }, { label: 'Labels', href: '/fm/labels-2' }] },
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/fm/labels-3' }, { label: 'Labels', href: '/fm/labels-4' }] },
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/fm/labels-5' }, { label: 'Labels', href: '/fm/labels-6' }] }
		]
	},
	{
		label: 'Social Media',
		sections: [
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/social/labels-1' }, { label: 'Labels', href: '/social/labels-2' }] },
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/social/labels-3' }, { label: 'Labels', href: '/social/labels-4' }] },
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/social/labels-5' }, { label: 'Labels', href: '/social/labels-6' }] }
		]
	},
	{
		label: 'Events',
		sections: [
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/events/labels-1' }, { label: 'Labels', href: '/events/labels-2' }] },
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/events/labels-3' }, { label: 'Labels', href: '/events/labels-4' }] },
			{ heading: 'Heading', items: [{ label: 'Labels', href: '/events/labels-5' }, { label: 'Labels', href: '/events/labels-6' }] }
		]
	}
];