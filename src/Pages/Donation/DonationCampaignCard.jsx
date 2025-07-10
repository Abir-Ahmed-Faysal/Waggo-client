import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router";

function DonationCampaignCard({ campaign }) {
  const {_id, petName, petImage, maxDonation, donatedAmount } = campaign;
  const progress = Math.min((donatedAmount / maxDonation) * 100, 100);
  const navigate=useNavigate()

  return (
    <Card className="max-w-sm shadow-lg rounded-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{petName}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={petImage} alt={petName} className="w-full h-48 object-cover rounded-md mb-3" />
        <p className="mb-2 text-sm text-gray-700">
          Max Donation: <strong>${maxDonation}</strong>
        </p>
        <p className="mb-2 text-sm text-gray-700">
          Donated Amount: <strong>${donatedAmount}</strong>
        </p>
        <Progress value={progress} className="mb-2" />
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate(`/donationCardDetails/${_id}`)} variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DonationCampaignCard;
