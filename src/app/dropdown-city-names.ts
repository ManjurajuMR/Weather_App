export type DropdownCityNames = Root2[]

export interface Root2 {
    name: string
    local_names?: LocalNames
    lat: number
    lon: number
    country: string
    state: string
}

export interface LocalNames {
    en?: string
    zh?: string
    ascii?: string
    feature_name?: string
    be?: string
    ru?: string
    de?: string
}



