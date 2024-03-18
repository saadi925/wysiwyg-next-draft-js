// Selectable.js

import { Listbox } from "@headlessui/react";
import styles from "../pages/styles.module.css";

const Selectable = ({ value, setValue, categories }) => {
  return (
    <Listbox value={value} onChange={setValue}>
      <div className={styles.selectableContainer}>
        <Listbox.Label className={styles.selectableLabel}>
          Parent Category
        </Listbox.Label>
        <Listbox.Button className={styles.selectableButton}>
          <span className="block truncate">
            {value
              ? categories.find((category) => category.id === value)?.name
              : "Select a category"}
          </span>
        </Listbox.Button>
        <Listbox.Options className={styles.optionContainer}>
          {categories &&
            categories.map((category) => (
              <Listbox.Option key={category.id} value={category.id}>
                {({ selected, active }) => (
                  <div
                    className={`${styles.optionItem} ${active ? "active" : ""}`}
                  >
                    <span className={`${selected ? "font-semibold" : ""}`}>
                      {category.name}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        ✔️
                      </span>
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default Selectable;
