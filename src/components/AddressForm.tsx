import React, { useState, useEffect, useCallback } from 'react';

interface PhotonFeature {
  properties: {
    name?: string;
    street?: string;
    city?: string;
    postcode?: string;
    country?: string;
    housenumber?: string;
    countrycode?: string;
  };
}

interface PhotonResponse {
  features: PhotonFeature[];
}

interface AddressState {
  street: string;
  city: string;
  postcode: string;
  country: string;
  number: string;
  floor: string;
}

interface AddressFormProps {
  onAddressChange: (fullAddress: string, isValid: boolean) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ onAddressChange }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<PhotonFeature[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [details, setDetails] = useState<AddressState>({
    street: '', city: '', postcode: '', country: '', number: '', floor: ''
  });

  const formatFullAddress = useCallback((d: AddressState): string => {
    const parts = [
      `${d.street} ${d.number}`.trim(),
      d.floor.trim(),
      d.postcode.trim(),
      d.city.trim(),
      d.country.trim()
    ].filter(Boolean);
    return parts.join(', ');
  }, []);

  useEffect(() => {
    // Validate required fields (floor is optional)
    const isValid = !!(details.street && details.number && details.city && details.postcode);
    onAddressChange(formatFullAddress(details), isValid);
  }, [details, onAddressChange, formatFullAddress]);

  const searchAddress = async (text: string) => {
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=10&lat=40.4168&lon=-3.7038`
      );
      const data: PhotonResponse = await response.json();

      // Filter for Spain and remove duplicates/irrelevant results
      const localResults = data.features.filter(f =>
        !f.properties.countrycode || f.properties.countrycode.toUpperCase() === 'ES'
      );

      setSuggestions(localResults.slice(0, 5));
    } catch (error) {
      console.error("Address search error", error);
    }
  };

  const handleSelectSuggestion = (s: PhotonFeature) => {
    const p = s.properties;
    setDetails(prev => ({
      ...prev,
      street: p.street || p.name || '',
      city: p.city || '',
      postcode: p.postcode || '',
      country: p.country || 'Spain',
      number: p.housenumber || prev.number
    }));
    setQuery(p.street || p.name || '');
    setShowDropdown(false);
  };

  return (
    <div className="space-y-6">
      <div className="relative space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Street / Main Road</label>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            setDetails(prev => ({ ...prev, street: val }));
            searchAddress(val);
            setShowDropdown(true);
          }}
          placeholder="Search or type address..."
          className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-[24px] text-sm font-bold focus:outline-none focus:border-black focus:bg-white transition-all"
        />

        {showDropdown && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-zinc-100 rounded-[24px] shadow-xl overflow-hidden">
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectSuggestion(s)}
                className="w-full text-left p-4 hover:bg-zinc-50 border-b border-zinc-50 last:border-none transition-colors"
              >
                <p className="text-[11px] font-black uppercase">{s.properties.street || s.properties.name}</p>
                <p className="text-[9px] text-zinc-400 font-bold uppercase">
                  {s.properties.city ? `${s.properties.city}, ` : ''} Spain
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Number *</label>
          <input
            type="text"
            value={details.number}
            onChange={(e) => setDetails({ ...details, number: e.target.value })}
            placeholder="15"
            className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-[24px] text-sm font-bold focus:outline-none focus:border-black focus:bg-white transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Floor / Door</label>
          <input
            type="text"
            value={details.floor}
            onChange={(e) => setDetails({ ...details, floor: e.target.value })}
            placeholder="3º B"
            className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-[24px] text-sm font-bold focus:outline-none focus:border-black focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Postcode *</label>
          <input
            type="text"
            value={details.postcode}
            onChange={(e) => setDetails({ ...details, postcode: e.target.value })}
            className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-[24px] text-sm font-bold focus:outline-none focus:border-black focus:bg-white transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">City *</label>
          <input
            type="text"
            value={details.city}
            onChange={(e) => setDetails({ ...details, city: e.target.value })}
            className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-[24px] text-sm font-bold focus:outline-none focus:border-black focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="p-5 bg-zinc-50 border border-zinc-100 rounded-[24px] space-y-1">
        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Address Confirmation:</p>
        <p className="text-xs font-black uppercase italic">
          {details.street ? `${details.street} ${details.number}` : 'Awaiting data...'}
        </p>
        {details.city && (
          <p className="text-[10px] text-zinc-400 font-bold uppercase">
            {details.postcode} {details.city}, Spain {details.floor && `• ${details.floor}`}
          </p>
        )}
      </div>
    </div>
  );
};