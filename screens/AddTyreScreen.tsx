import React, { useState, useMemo } from 'react';
import { Tyre, TyreType } from '../types';
import Header from '../components/Header';

interface AddTyreScreenProps {
  addTyre: (tyre: Omit<Tyre, 'id'>) => void;
  onBack: () => void;
}

const FormSection: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
    <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const InputField: React.FC<{label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type?: string}> = ({label, value, onChange, placeholder, type='text'}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
    </div>
);

const AddTyreScreen: React.FC<AddTyreScreenProps> = ({ addTyre, onBack }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [size, setSize] = useState('');
  const [type, setType] = useState<TyreType>(TyreType.Tubeless);
  const [price, setPrice] = useState('');
  const [pressure, setPressure] = useState('');
  const [quantity, setQuantity] = useState('');

  const formState = useMemo(() => ({
    brand: brand || 'N/A',
    model: model || 'N/A',
    size: size || 'N/A',
    type,
    price: parseFloat(price) || 0,
    pressure: parseInt(pressure, 10) || 0,
    quantity: parseInt(quantity, 10) || 0,
  }), [brand, model, size, type, price, pressure, quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !model || !size) {
      alert("Please fill in all basic information.");
      return;
    }
    addTyre(formState);
    onBack();
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Add New Tyre" onBack={onBack} />
      <form onSubmit={handleSubmit} className="flex-grow p-4 space-y-4">
        <FormSection title="Basic Information">
            <InputField label="Tyre Brand" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g., MRF, Ceat, Apollo" />
            <InputField label="Tyre Model" value={model} onChange={e => setModel(e.target.value)} placeholder="e.g., Wanderer, SportDrive" />
            <InputField label="Tyre Size" value={size} onChange={e => setSize(e.target.value)} placeholder="e.g., 195/55R16" />
        </FormSection>

        <FormSection title="Tyre Type">
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 rounded-lg">
                <button type="button" onClick={() => setType(TyreType.Tubeless)} className={`px-4 py-2 text-sm font-semibold rounded-md transition ${type === TyreType.Tubeless ? 'bg-blue-600 text-white shadow' : 'text-gray-700'}`}>Tubeless</button>
                <button type="button" onClick={() => setType(TyreType.TubeType)} className={`px-4 py-2 text-sm font-semibold rounded-md transition ${type === TyreType.TubeType ? 'bg-blue-600 text-white shadow' : 'text-gray-700'}`}>Tube Type</button>
            </div>
        </FormSection>

        <FormSection title="Specifications">
            <InputField label="Price Per Tyre (R)" value={price} onChange={e => setPrice(e.target.value)} placeholder="0" type="number" />
            <InputField label="Pressure (PSI)" value={pressure} onChange={e => setPressure(e.target.value)} placeholder="0" type="number" />
        </FormSection>

        <FormSection title="Inventory">
            <InputField label="Quantity in Stock" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="0" type="number" />
        </FormSection>

        <FormSection title="Preview">
            <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-2 text-sm">
                {Object.entries({
                    Brand: formState.brand, Model: formState.model, Size: formState.size, Type: formState.type,
                    Price: `R ${formState.price}`, Pressure: `${formState.pressure} PSI`, Quantity: formState.quantity
                }).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                        <span className="text-gray-500">{key}</span>
                        <span className="font-medium text-gray-800">{value}</span>
                    </div>
                ))}
            </div>
        </FormSection>

        <div className="pt-4 pb-2 sticky bottom-0 bg-gray-50">
            <div className="space-y-3">
                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">Add Tyre</button>
                <button type="button" onClick={onBack} className="w-full text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-200 transition">Cancel</button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default AddTyreScreen;