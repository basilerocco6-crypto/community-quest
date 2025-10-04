import { whopSdk } from "@/lib/whop-sdk";

export default function ExampleComponent() {
  // Example of how to use the Whop SDK
  const handleGetUser = async () => {
    try {
      // This is just an example - you'll need to implement actual API calls
      console.log("Whop SDK configured with:", {
        appId: process.env.NEXT_PUBLIC_WHOP_APP_ID,
        companyId: process.env.NEXT_PUBLIC_WHOP_COMPANY_ID,
      });
      
      // Example API call (uncomment when you have real data)
      // const user = await whopSdk.users.retrieve({ id: "user_id" });
      // console.log("User data:", user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-9 mb-4">
        Whop SDK Example
      </h3>
      <p className="text-gray-6 mb-4">
        This component shows how to use the Whop SDK. Check the browser console
        for SDK configuration details.
      </p>
      <button
        onClick={handleGetUser}
        className="bg-accent-9 text-white px-4 py-2 rounded hover:bg-accent-10 transition-colors"
      >
        Test Whop SDK
      </button>
    </div>
  );
}
