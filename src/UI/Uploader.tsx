// import { useEffect, useState } from "react";
// import supabase from "../services/supabase";

// function Uploader() {
//   const [exercises, setExercises] = useState<any[]>([]);

//   useEffect(() => {
//     const muscle = "row";
//     const apiLink = "https://api.api-ninjas.com/v1/exercises?name=";
//     const apiKey = "4D9jqhQWdplnb5lhWX+xvA==M4dJxYarGyFFKSUv";

//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLink}${muscle}`, {
//           method: "GET",
//           headers: {
//             "X-Api-Key": apiKey,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         setExercises(result);
//         console.log(result);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   function removeDuplicates(array, propertyName) {
//     const seen = new Set();
//     return array.filter((item) => {
//       const propertyValue = item[propertyName];
//       if (seen.has(propertyValue)) {
//         return true; // Duplicate found, filter it out
//       }
//       seen.add(propertyValue);
//       return false;
//     });
//   }

//   function handleUpload() {
//     async function uploadAll() {
//       const { data: exercisesData } = await supabase
//         .from("exercises")
//         .select("*")
//         .order("id");
//       console.log(exercisesData, "exercisesData");

//       const uniqueExercisesData = removeDuplicates(exercisesData, "name");

//       console.log(uniqueExercisesData);
//       const filteredData = exercises?.filter((item) => {
//         return exercisesData?.every((exercise) => item.name !== exercise.name);
//       });

//       const changed = filteredData?.map((item) => {
//         return {
//           name: item.name,
//           difficulty: item.difficulty,
//           instructions: item.instructions,
//           muscle:
//             item.muscle === "lower_back" && "middle_back"
//               ? "back"
//               : item.muscle,
//           equipment: item.equipment,
//           type: item.type,
//         };
//       });

//       console.log(changed, "filteredData");

//       const { error } = await supabase.from("exercises").insert(changed);
//       if (error) {
//         return console.log(error);
//       }
//     }
//     uploadAll();
//   }

//   return (
//     <div>
//       <button
//         style={{ background: "pink", padding: "2rem" }}
//         onClick={handleUpload}
//         disabled={exercises.length === 0}
//       >
//         Upload exrecises
//       </button>
//     </div>
//   );
// }

// export default Uploader;
