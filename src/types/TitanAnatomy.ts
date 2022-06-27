export enum BASE_TITAN_PART_IDS {
	HEAD = 'Head',
	TORSO = 'ChestUpper',
	SHOULDER_RIGHT = 'ArmUpperRight',
	SHOULDER_LEFT = 'ArmUpperLeft',
	HAND_RIGHT = 'HandRight',
	HAND_LEFT = 'HandLeft',
	LEG_RIGHT = 'LegUpperRight',
	LEG_LEFT = 'LegUpperLeft'
}

const BasePartIDs = [
	'Head',
	'ChestUpper',
	'ArmUpperRight',
	'ArmUpperLeft',
	'HandRight',
	'HandLeft',
	'LegUpperRight',
	'LegUpperLeft'
];

const AggregatedPartIDs = ['Head', 'ChestUpper', 'Arms', 'Legs'];

export const AGGREGATED_TO_BASE_PART_IDS = {
	HEAD: [BASE_TITAN_PART_IDS.HEAD],
	TORSO: [BASE_TITAN_PART_IDS.TORSO],

	ARMS: [
		BASE_TITAN_PART_IDS.SHOULDER_RIGHT,
		BASE_TITAN_PART_IDS.HAND_RIGHT,
		BASE_TITAN_PART_IDS.SHOULDER_LEFT,
		BASE_TITAN_PART_IDS.HAND_LEFT
	],

	LEGS: [BASE_TITAN_PART_IDS.LEG_RIGHT, BASE_TITAN_PART_IDS.LEG_LEFT]
};

export const TITAN_PART_REPRS: { [key: string]: string } = {
	HEAD: 'Head',
	TORSO: 'Torso',
	SHOULDER_RIGHT: 'Right Shoulder',
	SHOULDER_LEFT: 'Left Shoulder',
	HAND_RIGHT: 'Right Hand',
	HAND_LEFT: 'Left Hand',
	LEG_RIGHT: 'Right Leg',
	LEG_LEFT: 'Left Leg',

	ARMS: 'Arms',
	LEGS: 'Legs'
};

// const ARMOR_PREFIX = 'Armor';
// const BODY_PREFIX = 'Body';

// enum BaseTitanPartID {
// 	HEAD = 'HEAD',
// 	TORSO = 'TORSO',
// 	SHOULDER_RIGHT = 'SHOULDER_RIGHT',
// 	SHOULDER_LEFT = 'SHOULDER_LEFT',
// 	HAND_RIGHT = 'HAND_RIGHT',
// 	HAND_LEFT = 'HAND_LEFT',
// 	LEG_RIGHT = 'LEG_RIGHT',
// 	LEG_LEFT = 'LEG_LEFT'
// }

// enum ConsolidatedTitanPartID {
// 	HEAD = 'HEAD',
// 	TORSO = 'TORSO',
// 	ARM_RIGHT = 'ARM_RIGHT',
// 	ARM_LEFT = 'ARM_LEFT',
// 	ARMS = 'ARMS',
// 	LEGS = 'LEGS'
// }

// const TitanPartID: { [key: string]: string } = {
// 	...BaseTitanPartID,
// 	...ConsolidatedTitanPartID
// };

// const BASE_TITAN_PART_IDS = {
// 	HEAD: 'Head',
// 	TORSO: 'ChestUpper',
// 	SHOULDER_RIGHT: 'ArmUpperRight',
// 	SHOULDER_LEFT: 'ArmUpperLeft',
// 	HAND_RIGHT: 'HandRight',
// 	HAND_LEFT: 'HandLeft',
// 	LEG_RIGHT: 'LegUpperRight',
// 	LEG_LEFT: 'LegUpperLeft'
// };

// const CONSLIDATED_PART_IDS = {
// 	HEAD: [TitanPartID.HEAD],
// 	TORSO: [TitanPartID.TORSO],

// 	ARM_RIGHT: [TitanPartID.SHOULDER_RIGHT, TitanPartID.HAND_RIGHT],
// 	ARM_LEFT: [TitanPartID.SHOULDER_LEFT, TitanPartID.HAND_LEFT],

// 	ARMS: [
// 		TitanPartID.SHOULDER_RIGHT,
// 		TitanPartID.HAND_RIGHT,
// 		TitanPartID.SHOULDER_LEFT,
// 		TitanPartID.HAND_LEFT
// 	],

// 	LEGS: [TitanPartID.LEG_RIGHT, TitanPartID.LEG_LEFT]
// };

// const ALL_PART_IDS = {
// 	...CONSLIDATED_PART_IDS,

// 	SHOULDER_RIGHT: [BASE_TITAN_PART_IDS.SHOULDER_RIGHT],
// 	SHOULDER_LEFT: [BASE_TITAN_PART_IDS.SHOULDER_LEFT],

// 	HAND_RIGHT: [BASE_TITAN_PART_IDS.HAND_RIGHT],
// 	HAND_LEFT: [BASE_TITAN_PART_IDS.HAND_LEFT],

// 	LEG_RIGHT: [BASE_TITAN_PART_IDS.LEG_RIGHT],
// 	LEG_LEFT: [BASE_TITAN_PART_IDS.LEG_LEFT]
// };
