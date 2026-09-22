import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Perks() {
  const [perks, setPerks] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  const handleKeyDown = (e) => {
    // Trigger on 'Enter' or ',' (Comma)
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Prevent form submission or typing a comma

      const newPerk = inputValue.trim();

      // Add skill if it's not empty and not already in the list
      // if (newSkill && !skills.includes(newSkill)) {
      //   setSkills([...skills, newSkill]);
      //   setInputValue(""); // Clear the input field
      // }

      const exists = perks.some(
        (perk) => perk.toLowerCase() === newPerk.toLowerCase(),
      );

      //   if (newSkill && !exists) {
      //     setSkills((prev) => [...prev, newSkill]);
      //     setInputValue("");
      //   }

      if (!newPerk || exists) return;

      const updatedPerks = [...perks, newPerk];

      setPerks(updatedPerks);
      setInputValue("");

      axios
        .post(
          `${APIURL}/employer/add-perks`,
          { perks: updatedPerks },
          { withCredentials: true },
        )
        .then((res) => res.data)
        .then((finalData) => {
          if (finalData.success) {
          }
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Error saving perks");
        });
    }
  };

  const removePerk = (perkToRemove) => {
    const updatedPerks = perks.filter((p) => p !== perkToRemove);

    setPerks(updatedPerks);

    axios
      .post(
        `${APIURL}/employer/delete-perks`,
        { skill: perkToRemove },
        { withCredentials: true },
      )
      .catch(() => {
        toast.error("Error removing perk");
      });
  };

  useEffect(() => {
    axios
      .get(`${APIURL}/employer/get-perks`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setPerks(finalData.data);
        } else {
          toast.error(finalData.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.finalData.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  }, []);
  return (
    <>
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-4xl mx-auto mt-6">
        {/* Section Header */}
        <div className="mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Benefits & Perks
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Add perks that highlight your company culture and employee benefits.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Add Perks
          </label>

          {/* Input Field */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a perk and press Enter or Comma (e.g., Health Insurance, Remote Work)"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 placeholder-gray-400 mb-4"
          />

          {/* Dynamic Skill Tags Display */}
          <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-white border border-dashed border-gray-200 rounded-xl items-center">
            {perks.length === 0 && (
              <span className="text-sm text-gray-400 italic px-2">
                No perks added yet.
              </span>
            )}

            {perks.map((perk, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-100 animate-in zoom-in duration-200"
              >
                {perk}

                {/* Delete Button for Tag */}
                <button
                  type="button"
                  onClick={() => removePerk(perk)}
                  className="w-4 h-4 rounded-full inline-flex items-center justify-center text-red-400 hover:text-red-700 hover:bg-red-200 transition-colors focus:outline-none"
                  aria-label={`Remove ${perk}`}
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Highlight your company culture with 4-8 strong perks.
          </p>
        </div>
      </section>
    </>
  );
}
