//

import React from "react";

const BenefitsSection = ({
  textCenter,
  locale,
  advantageData,
}: {
  textCenter: boolean;
  locale: string;
  advantageData: any;
}) => {
  // Extract localized advantage data
  const localizedAdvantages = advantageData.advantages
    .map((advantage: any) => {
      // Find the correct localization inside each advantage's localizations array
      const localizedAdvantage =
        advantage.localizations?.find((loc: any) => loc.locale === locale) ||
        advantage; // Fallback to the main advantage if no localization is found

      return localizedAdvantage;
    })
    .filter(Boolean); // Remove undefined values if no match is found

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {!textCenter ? (
          <div className="flex flex-wrap items-center justify-center md:justify-between mb-12">
            <h2 className="text-3xl md:text-5xl !text-center md:text-start font-bold text-gray-900 dark:text-white border-l-4 p-2 border-l-rose-500 ">
              {advantageData.Title}
            </h2>
          </div>
        ) : (
          <h2 className="text-3xl md:text-5xl font-bold text-start md:text-center text-gray-900 dark:text-white mb-12 border-l-4 border-l-rose-500 w-fit mx-auto p-2">
            Discover Our Advantages
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {localizedAdvantages.map((advantage: any) => (
            <div
              key={advantage.id}
              className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md"
            >
              <img
                src={`http://localhost:1337${advantage.Icon?.url}`}
                alt={advantage.Icon?.alternativeText || advantage.Title}
                className="w-12 h-12"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {advantage.Title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {advantage.Description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
