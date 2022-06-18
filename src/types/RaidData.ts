export interface Buff {
	bonus_type: string;
	bonus_amount: number;
}

export interface TitanPart {
	part_id: string;
	total_hp: number;
	cursed?: boolean;
}

export interface Titan {
	enemy_id: string;
	enemy_name: string;

	total_hp: number;
	parts: TitanPart[];

	area_debuffs?: Buff[];
	cursed_debuffs?: Buff[];
}

export interface EnhancedTitanPart extends TitanPart {
	cursed: boolean;
	total_hp_formatted: string;
}

export interface ConsolidateditanPart {
	part_id: string;

	armor_hp: number;
	body_hp: number;

	armor_cursed: boolean;
	body_cursed: boolean;
}

export interface EnhancedTitan extends Titan {
	parts: EnhancedTitanPart[];

	total_armor_hp: number;
	total_armor_hp_formatted: string;

	total_body_hp: number;
	total_body_hp_formatted: string;

	skippable_hp: number;
	skippable_hp_formatted: string;

	consolidated_parts: ConsolidateditanPart[];

	cursed_parts: EnhancedTitanPart[];
	number_of_cursed_parts: number;
}

export interface RaidSeedDataRaw {
	spawn_sequence: string[];

	raid_info_valid_from: string;
	raid_info_expire_at: string;

	tier: number;
	level: number;

	titans: Titan[];

	area_buffs?: Buff[];
}

export interface RaidSeedDataEnhanced extends RaidSeedDataRaw {
	raid_total_target_hp: number;
	raid_total_target_hp_formatted: string;

	titans: EnhancedTitan[];
}

export interface RaidSeedDataPrepared {
	raid_info_valid_from: string;
	raid_info_expire_at: string;

	raw_data: RaidSeedData;

	data_by_tier_level: {
		[key: string]: {
			[key: string]: RaidSeedDataRaw | RaidSeedDataEnhanced;
		};
	};
}

export type RaidSeedData = RaidSeedDataRaw[] | RaidSeedDataEnhanced[];
