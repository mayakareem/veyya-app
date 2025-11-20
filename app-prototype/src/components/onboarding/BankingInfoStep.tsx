import { OnboardingData } from "@/app/providers/onboarding/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
};

const thailandBanks = [
  "Bangkok Bank",
  "Kasikorn Bank",
  "Siam Commercial Bank",
  "Krung Thai Bank",
  "Bank of Ayudhya (Krungsri)",
  "TMB Bank",
  "Government Savings Bank",
  "UOB (Thailand)",
  "CIMB Thai Bank",
  "Thanachart Bank",
];

export default function BankingInfoStep({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Banking Information</h2>
        <p className="text-muted-foreground">
          Where should we send your payments? Weekly payouts every Friday.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bankName">
          Bank Name <span className="text-red-500">*</span>
        </Label>
        <Select value={data.bankName} onValueChange={(value) => updateData({ bankName: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select your bank" />
          </SelectTrigger>
          <SelectContent>
            {thailandBanks.map((bank) => (
              <SelectItem key={bank} value={bank}>
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountName">
          Account Holder Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="accountName"
          value={data.accountName}
          onChange={(e) => updateData({ accountName: e.target.value })}
          placeholder="Name as it appears on your bank account"
        />
        <p className="text-xs text-muted-foreground">
          Must match the name on your National ID or Business Registration
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountNumber">
          Account Number <span className="text-red-500">*</span>
        </Label>
        <Input
          id="accountNumber"
          value={data.accountNumber}
          onChange={(e) => updateData({ accountNumber: e.target.value })}
          placeholder="XXX-X-XXXXX-X"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="branchName">
          Branch Name/Code <span className="text-red-500">*</span>
        </Label>
        <Input
          id="branchName"
          value={data.branchName}
          onChange={(e) => updateData({ branchName: e.target.value })}
          placeholder="e.g., Silom Branch"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Payment Schedule</h4>
        <ul className="space-y-1 text-sm">
          <li>• Payments are processed every Friday</li>
          <li>• Platform fee: 25% per transaction</li>
          <li>• Funds typically arrive within 1-2 business days</li>
          <li>• You'll receive detailed payment reports via email</li>
        </ul>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Security:</strong> Your banking information is encrypted and stored securely. We comply with PCI DSS standards for financial data protection.
        </p>
      </div>
    </div>
  );
}
