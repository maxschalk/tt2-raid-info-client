import type {
	RaidSeedDataPrepared,
	RaidSeedData,
	RaidInfoDataRaw,
	RaidInfoDataEnhanced,
} from 'src/types';

export function prepareRaidSeed(seed: RaidSeedData): RaidSeedDataPrepared {
	const data_by_tier_level: {
		[key: string]: {
			[key: string]: RaidInfoDataRaw | RaidInfoDataEnhanced;
		};
	} = {};

	seed.forEach((raidInfo) => {
		const { tier, level } = raidInfo;

		if (!Object.keys(data_by_tier_level).includes(tier.toString())) {
			data_by_tier_level[tier.toString()] = {};
		}

		const tier_obj = data_by_tier_level[tier.toString()];

		tier_obj[level.toString()] = raidInfo;
	});

	const prepared: RaidSeedDataPrepared = {
		raid_info_valid_from: seed[0].raid_info_valid_from,
		raid_info_expire_at: seed[0].raid_info_expire_at,

		data: seed,

		data_by_tier_level,
	};

	return prepared;
}
