export enum BASE_TITAN_PART_IDS {
    HEAD = 'Head',
    TORSO = 'ChestUpper',
    SHOULDER_RIGHT = 'ArmUpperRight',
    SHOULDER_LEFT = 'ArmUpperLeft',
    HAND_RIGHT = 'HandRight',
    HAND_LEFT = 'HandLeft',
    LEG_RIGHT = 'LegUpperRight',
    LEG_LEFT = 'LegUpperLeft',
}

export const AGGREGATED_TO_BASE_PART_IDS = {
    HEAD: [BASE_TITAN_PART_IDS.HEAD],
    TORSO: [BASE_TITAN_PART_IDS.TORSO],

    ARMS: [
        BASE_TITAN_PART_IDS.SHOULDER_RIGHT,
        BASE_TITAN_PART_IDS.HAND_RIGHT,
        BASE_TITAN_PART_IDS.SHOULDER_LEFT,
        BASE_TITAN_PART_IDS.HAND_LEFT,
    ],

    LEGS: [BASE_TITAN_PART_IDS.LEG_RIGHT, BASE_TITAN_PART_IDS.LEG_LEFT],
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
    LEGS: 'Legs',
};
