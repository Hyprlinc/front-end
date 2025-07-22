// import Select from "react-select";

// const MultiSelect = ({
//   label,
//   name,
//   options,
//   value,
//   onChange,
//   placeholder = "Select options",
//   isRequired = false,
//   isDisabled = false,
// }) => {
//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       minHeight: "44px",
//       backgroundColor: "#374151",
//       borderColor: "#4B5563",
//       borderRadius: "0.5rem",
//       "&:hover": {
//         borderColor: "#4B5563",
//       },
//       boxShadow: "none",
//     }),
//     menu: (provided) => ({
//       ...provided,
//       backgroundColor: "#374151",
//       borderColor: "#4B5563",
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected
//         ? "#1E40AF"
//         : state.isFocused
//         ? "#4B5563"
//         : "#374151",
//       color: "white",
//       "&:active": {
//         backgroundColor: "#1E40AF",
//       },
//       // Add padding to make space for the checkmark
//       paddingLeft: "2rem",
//       // Add checkmark for selected items
//       position: "relative",
//       "&:before": state.isSelected
//         ? {
//             content: '"✓"',
//             position: "absolute",
//             left: "0.75rem",
//             top: "50%",
//             transform: "translateY(-50%)",
//             color: "white",
//           }
//         : {},
//     }),
//     multiValue: (provided) => ({
//       ...provided,
//       backgroundColor: "#1E40AF",
//       borderRadius: "0.375rem",
//     }),
//     multiValueLabel: (provided) => ({
//       ...provided,
//       color: "white",
//       fontWeight: "500",
//       padding: "2px 6px",
//     }),
//     multiValueRemove: (provided) => ({
//       ...provided,
//       color: "#93C5FD",
//       ":hover": {
//         backgroundColor: "#1D4ED8",
//         color: "white",
//       },
//     }),
//   };

//   return (
//     <div className="w-full">
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           {label}
//           {isRequired && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}

//       <Select
//         isMulti
//         name={name}
//         options={options}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         isDisabled={isDisabled}
//         closeMenuOnSelect={false}
//         hideSelectedOptions={false}
//         className="react-select-container"
//         classNamePrefix="react-select"
//         styles={customStyles}
//         classNames={{
//           control: () =>
//             "!bg-gray-700 !border-gray-600 !rounded-lg !min-h-[44px]",
//           input: () => "!text-white",
//           placeholder: () => "!text-gray-400",
//           menu: () => "!bg-gray-700 !border-gray-600",
//           option: ({ isFocused, isSelected }) =>
//             isSelected
//               ? "!bg-blue-600"
//               : isFocused
//               ? "!bg-gray-600"
//               : "!bg-gray-700",
//           multiValue: () => "!bg-blue-600 !rounded",
//           multiValueLabel: () => "!text-white !font-medium",
//           multiValueRemove: () =>
//             "!text-blue-200 hover:!bg-blue-700 hover:!text-white",
//           indicatorsContainer: () => "!text-gray-400",
//           dropdownIndicator: () => "hover:!text-gray-300",
//           clearIndicator: () => "hover:!text-gray-300",
//           indicatorSeparator: () => "!bg-gray-500",
//         }}
//       />
//     </div>
//   );
// };

// export default MultiSelect;


import Select, { components } from "react-select";

const MultiSelect = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder = "Select options",
  isRequired = false,
  isDisabled = false,
}) => {
  // Custom components for rendering
  const Option = (props) => (
    <components.Option {...props}>
      <div className="flex items-center">
        {props.data.icon && (
          <span className="mr-2">{props.data.icon}</span>
        )}
        {props.children}
      </div>
    </components.Option>
  );

  const MultiValueLabel = (props) => (
    <components.MultiValueLabel {...props}>
      <div className="flex items-center">
        {props.data.icon && (
          <span className="mr-2">{props.data.icon}</span>
        )}
        {props.children}
      </div>
    </components.MultiValueLabel>
  );

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "44px",
      backgroundColor: "#374151",
      borderColor: "#4B5563",
      borderRadius: "0.5rem",
      "&:hover": {
        borderColor: "#4B5563",
      },
      boxShadow: "none",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#374151",
      borderColor: "#4B5563",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#4B5563" : "#374151", // Removed selected background
      color: "white",
      position: "relative",
      paddingLeft: "2rem", // Make space for checkmark
      "&:before": state.isSelected ? {
        content: '"✓"',
        position: "absolute",
        left: "0.75rem",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#93C5FD", // Light blue checkmark
      } : {},
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#1E40AF",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
      fontWeight: "500",
      padding: "2px 6px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#93C5FD",
      ":hover": {
        backgroundColor: "#1D4ED8",
        color: "white",
      },
    }),
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Select
        isMulti
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        className="react-select-container"
        classNamePrefix="react-select"
        styles={customStyles}
        components={{ Option, MultiValueLabel }}
        classNames={{
          control: () =>
            "!bg-gray-700 !border-gray-600 !rounded-lg !min-h-[44px]",
          input: () => "!text-white",
          placeholder: () => "!text-gray-400",
          menu: () => "!bg-gray-700 !border-gray-600",
          option: ({ isFocused, isSelected }) =>
            isFocused
              ? "!bg-gray-600"
              : "!bg-gray-700",
          multiValue: () => "!bg-blue-600 !rounded",
          multiValueLabel: () => "!text-white !font-medium",
          multiValueRemove: () =>
            "!text-blue-200 hover:!bg-blue-700 hover:!text-white",
          indicatorsContainer: () => "!text-gray-400",
          dropdownIndicator: () => "hover:!text-gray-300",
          clearIndicator: () => "hover:!text-gray-300",
          indicatorSeparator: () => "!bg-gray-500",
        }}
      />
    </div>
  );
};

export default MultiSelect;