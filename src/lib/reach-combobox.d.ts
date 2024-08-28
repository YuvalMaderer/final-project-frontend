declare module "@reach/combobox" {
  export const Combobox: React.FC<any>;
  export const ComboboxInput: React.FC<any>;
  export const ComboboxPopover: React.FC<any>;
  export const ComboboxList: React.FC<any>;
  export const ComboboxOption: React.FC<any>;
}

declare module 'react-select-country-list' {
  interface CountryListOption {
    label: string;
    value: string;
  }

  interface CountryList {
    getData(): CountryListOption[];
    getLabels(): string[];
    getValues(): string[];
    getLabel(value: string): string;
    getValue(label: string): string;
  }

  const countryList: () => CountryList;

  export default countryList;
}
