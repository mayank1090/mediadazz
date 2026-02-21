// app/data/menuData.ts
import { TopLevel } from '../types/navbar';

export const menuData: TopLevel[] = [
	{
		label: 'Outdoor & OOH',
		sections: [
			{
				heading: 'Outdoor & OOH Media',
				slug: 'outdoor-ooh-media',
				items: [
					{ label: 'Billboards', slug: 'billboards' },
					{ label: 'Hoardings', slug: 'hoardings' },
					{ label: 'Lamp Posts', slug: 'lamp-posts' },
					{ label: 'Bridge Faces', slug: 'bridge-faces' },
					{ label: 'Bus Shelters', slug: 'bus-shelters' },
					{ label: 'MUPIs', slug: 'mupis' },
					{ label: 'Building Facades', slug: 'building-facades' },
					{ label: 'Metro/ Railway Stations', slug: 'metro-railway-stations' },
					{ label: 'Malls', slug: 'malls' },
					{ label: 'Airports', slug: 'airports' },
					{ label: 'Cinemas', slug: 'cinemas' },
					{ label: 'Hotels', slug: 'hotels' },
					{ label: 'Elevators', slug: 'elevators' },
					{ label: 'Gas Stations', slug: 'gas-stations'	 },
					{ label: 'Supermarkets', slug: 'supermarkets' },
					{ label: 'Food Courts and Restaurants', slug: 'food-courts-and-restaurants' },
					{ label: 'Taxis', slug: 'taxis' },
					{ label: 'Promo Trucks', slug: 'promo-trucks' },
					{ label: 'Point of Sale', slug: 'point-of-sale' },
					{ label: 'Inflight', slug: 'inflight' },
					{ label: 'Plan your Outdoor/OOH Campaign', slug: 'plan-your-outdoor-oooh-campaign' }
				]
			}
		]
	},
	{
		label: 'Print Media',
		sections: [
			{
				heading: 'Print Media',
				slug: 'print-media',
				items: [
					{ label: 'English Newspapers', slug: 'english-newspapers' },
					{ label: 'Arabic Newspapers', slug: 'arabic-newspapers' },
					{ label: 'English Magazines', slug: 'english-magazines' },
					{ label: 'Arabic Magazines', slug: 'arabic-magazines' },
					{ label: 'Newspapers - Other Languages', slug: 'newspapers-other-languages' },
					{ label: 'Magazines - Other Languages', slug: 'magazines-other-languages' },
					{ label: 'Plan your Print Campaign', slug: 'plan-your-print-campaign' }
				]
			}
		]
	},
	{
		label: 'FM Radio',
		sections: [
			{
				heading: 'FM Radio',
				slug: 'fm-radio',
				items: [
					{ label: 'English FM', slug: 'english-fm' },
					{ label: 'Arabic FM', slug: 'arabic-fm' },
					{ label: 'Hindi FM', slug: 'hindi-fm' },
					{ label: 'Tagalog FM', slug: 'tagalog-fm' },
					{ label: 'Malayalam FM', slug: 'malayalam-fm' },
					{ label: 'Russian FM', slug: 'russian-fm' },
					{ label: 'Farsi FM', slug: 'farsi-fm' },
					{ label: 'Chinese FM', slug: 'chinese-fm' },
					{ label: 'Plan your Radio Campaign', slug: 'plan-your-radio-campaign' }
				]
			}
		]
	},
	{
		label: 'Online Media',
		sections: [
			{
				heading: 'Online Media',
				slug: 'online-media',
				items: [
					{ label: 'Websites', slug: 'websites' },
					{ label: 'Blogs', slug: 'blogs' },
					{ label: 'News Sites', slug: 'news-sites' },
					{ label: 'Classified Sites', slug: 'classified-sites' },
					{ label: 'Forum Sites', slug: 'forum-sites' },
					{ label: 'Email Newsletters', slug: 'email-newsletters' },
					{ label: 'Forums & Communities', slug: 'forums-and-communities' },
					{ label: 'Social Media', slug: 'social-media' },
					{ label: 'Podcast', slug: 'podcast' },
					{ label: 'Influencers', slug: 'influencers' },
					{ label: 'OTT / VOD Platforms', slug: 'ott-vod-platforms' },
					{ label: 'Plan your Online Campaign', slug: 'plan-your-online-campaign' }
				]
			}
		]
	},
	{
		label: 'Events',
		sections: [
			{
				heading: 'Events',
				slug: 'events-exhibitions',
				items: [
					{ label: 'Free to Public Events' , slug: 'free-to-public-events' },
					{ label: 'Paid Entry Events' , slug: 'paid-entry-events' },
					{ label: 'Paid Entry Industry Events' , slug: 'paid-entry-industry-events' },
					{ label: 'Free Entry Industry Events' , slug: 'free-entry-industry-events' },
					{ label: 'Plan your Events Campaign', slug: 'plan-your-events-campaign' },
				]
			}
		]
	}
];