import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label,
  Select,
} from '@roketid/windmill-react-ui';

interface FooterButton {
  text: string;
  onClick?: () => void;
  layout?: 'outline' | 'primary';
  fullWidth?: boolean;
}

interface DropdownField {
  field: string;
  items: { id: string; value: string }[];
}

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: React.ReactNode;
  formFields?: string[];
  dropdownFields?: DropdownField[];
  onSubmit?: (formData: Record<string, string>) => void;
  footerButtons?: FooterButton[];
}

const GenericFormModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  header,
  formFields = [],
  dropdownFields = [],
  onSubmit,
  footerButtons,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Initialize empty form values when formFields or dropdownFields change
  useEffect(() => {
    const initialData = {
      ...formFields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}),
      ...dropdownFields.reduce((acc, field) => ({ ...acc, [field.field]: '' }), {}),
    };
    setFormData(initialData);
  }, []);
  //}, [formFields, dropdownFields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>{header}</ModalHeader>

      <ModalBody>
        {formFields.length > 0 || dropdownFields.length > 0 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Text Inputs */}
            {formFields.map((field, idx) => (
              <Label key={idx} className="block mt-3">
                <span className="capitalize">{field}</span>
                <Input
                  className="mt-1"
                  type="text"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  required
                />
              </Label>
            ))}

            {/* Dropdown Fields */}
            {dropdownFields.map((dropdown, idx) => (
              <Label key={idx} className="block mt-3">
                <span className="capitalize">{dropdown.field}</span>
                <Select
                  className="mt-1"
                  name={dropdown.field}
                  value={formData[dropdown.field] || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select {dropdown.field}</option>
                  {dropdown.items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.value}
                    </option>
                  ))}
                </Select>
              </Label>
            ))}
          </form>
        ) : (
          <div>No form fields provided.</div>
        )}
      </ModalBody>

      <ModalFooter className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
        {footerButtons && footerButtons.length > 0 ? (
          footerButtons.map((btn, idx) => (
            <Button
              key={idx}
              layout={btn.layout || 'primary'}
              onClick={btn.onClick}
              className={`${btn.fullWidth ? 'w-full sm:w-auto' : ''}`}
            >
              {btn.text}
            </Button>
          ))
        ) : (
          <>
            <Button layout="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button layout="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default GenericFormModal;
