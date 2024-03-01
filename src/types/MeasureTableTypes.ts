export type Measure = {
  name: string;
  type: string;
  data_key_pair: string;
  unit: "kg" | "%" | "cm" | "kcal";
  valueArray?:
    | { value: string; added_at: string; unit: string; id: string }[]
    | null;
  id: string;
};

export const measures: Measure[] = [
  {
    name: "Weight",
    type: "Core",
    data_key_pair: "weight",
    unit: "kg",
    id: "",
  },
  {
    name: "Height",
    type: "Core",
    data_key_pair: "height",
    unit: "cm",
    id: "",
  },
  {
    name: "Body fat percentage",
    type: "Core",
    data_key_pair: "body_fat_percentage",
    unit: "%",
    id: "",
  },
  {
    name: "Caloric intake",
    type: "Core",
    data_key_pair: "caloric_intake",
    unit: "kcal",
    id: "",
  },
  {
    name: "Waist",
    type: "Body part",
    data_key_pair: "waist",
    unit: "cm",

    id: "",
  },
  {
    name: "Neck",
    type: "Body part",
    data_key_pair: "neck",
    unit: "cm",

    id: "",
  },
  {
    name: "Chest",
    type: "Body part",
    data_key_pair: "chest",
    unit: "cm",

    id: "",
  },
  {
    name: "Hips",
    type: "Body part",
    data_key_pair: "hips",
    unit: "cm",

    id: "",
  },
  {
    name: "Left biceps",
    type: "Body part",
    data_key_pair: "left_bicep",
    unit: "cm",
    id: "",
  },
  {
    name: "Right biceps",
    type: "Body part",
    data_key_pair: "right_bicep",
    unit: "cm",
    id: "",
  },
  {
    name: "Shoulders",
    type: "Body part",
    data_key_pair: "shoulders",
    unit: "cm",
    id: "",
  },
  {
    name: "Left thigh",
    type: "Body part",
    data_key_pair: "left_thigh",
    unit: "cm",
    id: "",
  },
  {
    name: "Right thigh",
    type: "Body part",
    data_key_pair: "right_thigh",
    unit: "cm",
    id: "",
  },
];

export type SingleMeasure = {
  value: number;
  added_at: string;
  unit: string;
  id: string;
};
