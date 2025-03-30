import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";

const GenerateCredit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      navigate("/analyses");
    }, 1000);
  };
  const handleNavigateToSeeScore = () => {
    return navigate("/analyses");
  };

  return (
    <div>
      <nav>
        <div className="container flex items-center justify-between pt-8">
          <img src="/logo-mono.png" alt="Logo Mono" />

          <div className="secondary-navigation space-x-5">
            <Link to="/">Home</Link>
            <Link to="/generate-credit">Generate Credit</Link>
            <Link to="/">Credit Offers</Link>
            <Link to="/">AI Insights</Link>
            <Link to="/">Settings</Link>
          </div>
        </div>
      </nav>

      <main className="container">
        <h1 className="font-bold text-6xl max-w-[700px] leading-[1.2] font-montserrat py-10 animate fade-up">
          Generate Your Financial Profile Score
        </h1>

        <form onSubmit={handleFormSubmit} className="animate fade-up delay-30">
          <div className="md:grid grid-cols-2 md:gap-16 md:gap-x-30">
            <Input
              id="firstname"
              type="firstname"
              placeholder="Your First Name"
            />
            <Input id="lastname" type="lastname" placeholder="Your Last Name" />
            <Input
              id="postalAddress"
              type="postalAddress"
              placeholder="Postal Address"
            />
            <Input id="mobile" type="mobile" placeholder="Mobile Number" />
            <Input
              id="employmentStatus"
              type="employmentStatus"
              placeholder="Employment Status"
            />
            <Input id="email" type="email" placeholder="Email (Optional)" />
          </div>
          <div className="text-center mt-4">
            <input id="terms" type="checkbox" />
            <label htmlFor="terms" className="ml-2">
              I agree to give my data to NeuralCash for information purposes.
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            className={`mt-16 mb-40 w-[250px] h-[30px] mx-auto block text-center ${
              isLoading ? "is-loading" : ""
            }`}
            onClick={handleNavigateToSeeScore}
          >
            {isLoading ? "Processing... Please wait!" : "Generate FPS"}
          </Button>
        </form>

        <img
          src="/footer-links.svg"
          alt="Dummy Footer section for the sake of time. Please!"
          className="mx-auto mb-20"
        />
      </main>
    </div>
  );
};

export default GenerateCredit;
