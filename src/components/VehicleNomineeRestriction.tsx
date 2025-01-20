import { useDisclosure } from "@chakra-ui/react";
import ModalComponent from "./Drawer/ModalComponent";
import SubscriptionPlans from "./Subscription";
import { MdClose } from "react-icons/md";




interface AddVehicleSubscriptionProps {
    plan: number;
    closeModal: () => void;
    openAddBillingMethod: (id: string, isSubscription: boolean) => void;
  }
  


const AddVehicleSubscription = ({
    plan,
    closeModal,
    openAddBillingMethod,
  }: AddVehicleSubscriptionProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const renderPlanMessage = () => {
      if (plan === 2) {
        return (
          <p className="text-lg font-medium text-gray-800">
            You can only add up to two (2) vehicles with your current plan. Please
            upgrade to add more vehicles.
          </p>
        );
      }
      if (plan === 3) {
        return (
          <p className="text-lg font-medium text-gray-800">
            You can only add up to five (5) vehicles with your current plan. Please
            upgrade to add more vehicles.
          </p>
        );
      }
      return null;
    };
  
    return (
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
        {/* Modal for Subscription Plans */}
        <ModalComponent
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          type="subscription"
          display={
            <SubscriptionPlans
              onClick={(id) => {
                openAddBillingMethod(id, true);
                onClose();
                closeModal();
              }}
            />
          }
        />
  
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={closeModal}
          aria-label="Close"
        >
          <MdClose size={24} />
        </button>
  
        {/* Subscription Message */}
        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          {renderPlanMessage()}
          {plan === 1 && (
            <>
              <p className="mt-2 text-lg font-medium text-gray-800">
                To add vehicles, you need to subscribe to a plan.
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Choose one of our subscription plans to continue adding vehicles.
              </p>
            </>
          )}
          <button
            className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onOpen}
          >
            Subscribe Now
          </button>
        </div>
      </div>
    );
  };
  

  export default AddVehicleSubscription 
