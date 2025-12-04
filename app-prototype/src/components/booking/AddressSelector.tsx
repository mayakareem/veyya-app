"use client";

import { useState } from "react";
import { MapPin, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  area: string;
  isDefault?: boolean;
}

// Mock saved addresses - in real app this would come from user profile
const mockAddresses: Address[] = [
  {
    id: "1",
    label: "Home",
    line1: "Building 23, Dubai Marina",
    line2: "Apartment 405",
    city: "Dubai",
    area: "Dubai Marina",
    isDefault: true,
  },
  {
    id: "2",
    label: "Work",
    line1: "Office Tower 2, DIFC",
    line2: "Floor 15",
    city: "Dubai",
    area: "DIFC",
  },
];

interface AddressSelectorProps {
  selectedAddress: Address | null;
  onSelectAddress: (address: Address | null) => void;
}

export default function AddressSelector({
  selectedAddress,
  onSelectAddress,
}: AddressSelectorProps) {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    line1: "",
    line2: "",
    city: "Dubai",
    area: "",
  });

  const handleSaveNewAddress = () => {
    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
    };
    onSelectAddress(address);
    setShowNewAddressForm(false);
    setNewAddress({
      label: "",
      line1: "",
      line2: "",
      city: "Dubai",
      area: "",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Select Service Location</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Where would you like us to provide this service?
        </p>
      </div>

      {!showNewAddressForm ? (
        <>
          {/* Saved Addresses */}
          <div className="space-y-3">
            {mockAddresses.map((address) => (
              <button
                key={address.id}
                onClick={() => onSelectAddress(address)}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  selectedAddress?.id === address.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{address.label}</p>
                        {address.isDefault && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {address.line1}
                      </p>
                      {address.line2 && (
                        <p className="text-sm text-muted-foreground">
                          {address.line2}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {address.area}, {address.city}
                      </p>
                    </div>
                  </div>
                  {selectedAddress?.id === address.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 ml-2">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Add New Address Button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowNewAddressForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Address
          </Button>
        </>
      ) : (
        /* New Address Form */
        <div className="space-y-4 bg-muted/20 p-4 rounded-lg">
          <h4 className="font-semibold">Add New Address</h4>

          <div>
            <Label htmlFor="label">Address Label</Label>
            <Input
              id="label"
              placeholder="e.g., Home, Work, Office"
              value={newAddress.label}
              onChange={(e) =>
                setNewAddress({ ...newAddress, label: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="line1">Street Address</Label>
            <Input
              id="line1"
              placeholder="Building name/number, street"
              value={newAddress.line1}
              onChange={(e) =>
                setNewAddress({ ...newAddress, line1: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="line2">Apartment/Floor (Optional)</Label>
            <Input
              id="line2"
              placeholder="Apartment, suite, unit, floor"
              value={newAddress.line2}
              onChange={(e) =>
                setNewAddress({ ...newAddress, line2: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="area">Area</Label>
              <Input
                id="area"
                placeholder="e.g., Dubai Marina"
                value={newAddress.area}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, area: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowNewAddressForm(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSaveNewAddress}
              disabled={!newAddress.label || !newAddress.line1 || !newAddress.area}
            >
              Save Address
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
