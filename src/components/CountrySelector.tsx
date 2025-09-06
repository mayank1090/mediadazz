'use client';

import { useMemo, useState } from 'react';
import allCountries from 'world-countries';
import ReactCountryFlag from 'react-country-flag';

type Country = {
	code: string;
	name: string;
};

type Props = {
	value?: string;
	onChange?: (countryCode: string) => void;
	className?: string;
};

const COUNTRIES: Country[] = allCountries
	.map((c) => ({ code: c.cca2, name: c.name.common }))
	.filter((c) => !!c.code && !!c.name)
	.sort((a, b) => a.name.localeCompare(b.name));

export default function CountrySelector({ value, onChange, className = '' }: Props) {
	const [open, setOpen] = useState(false);
	const isControlled = value !== undefined;
	const [internalCode, setInternalCode] = useState<string>(COUNTRIES[0].code);
	const selectedCode = isControlled ? (value as string) : internalCode;
	const selected = useMemo(
		() => COUNTRIES.find((c) => c.code === selectedCode) ?? COUNTRIES[0],
		[selectedCode]
	);

	function handleSelect(code: string) {
		setOpen(false);
		if (!isControlled) {
			setInternalCode(code);
		}
		onChange?.(code);
	}

	return (
		<div className={`relative ${className}`}>
			<button
				type="button"
				className="inline-flex items-center gap-[10px] h-6 bg-white"
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
			>
				<ReactCountryFlag svg countryCode={selected.code} className="h-4 w-6" style={{ width: '1.5rem', height: '1rem' }} aria-label={selected.name} />
				<span className="font-medium text-black font-satoshi inline text-sm">{selected.code}</span>
				<svg className={`h-5 w-5 text-black transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
				</svg>
			</button>

			{open && (
				<ul
					role="listbox"
					className="absolute right-0 z-50 mt-2 w-64 max-h-72 overflow-auto rounded-xl border border-neutral-200 bg-white shadow-lg"
				>
					{COUNTRIES.map((c) => (
						<li key={c.code} role="option" aria-selected={selected.code === c.code}>
							<button
								type="button"
								className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-50 ${
									selected.code === c.code ? 'text-brand' : 'text-neutral-800'
								}`}
								onClick={() => handleSelect(c.code)}
							>
								<ReactCountryFlag svg countryCode={c.code} className="h-4 w-6" style={{ width: '1.5rem', height: '1rem' }} aria-label={c.name} />
								<span className="truncate">{c.name}</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}


