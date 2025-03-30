

const AboutUs = () => {
  return (
    <div className="container py-32">
      <section className="md:grid grid-cols-2 items-center gap-4">
        <img
          src="/monthly_saving_stat.svg"
          alt="Monthly Saving Stat"
          className="fade-right animate-on-scroll"
        />

        <div className="space-y-5 fade-up animate-on-scroll">
          <p className="tag tag-white">About Us</p>
          <h2 className="subtitle">
            Revolutionizing Finance, One Score at a Time
          </h2>

          <ul className="space-y-[12px] features">
            <li>
              <h4>AI-Driven Accuracy</h4>
              <p>Smarter assessments, bettter decisions with our AI sytsem</p>
            </li>

            <li>
              <h4>Secure and Private</h4>
              <p>Your data, protected with cutting edge encryption</p>
            </li>

            <li>
              <h4>Real-Time Insights</h4>
              <p>
                We're committed to giving instant feedback on your financial
                standing
              </p>
            </li>

            <li>
              <h4>More Awesome Features</h4>
              <p>We're committed to adding more exciting features!</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="md:grid grid-cols-2 items-center gap-4 mt-48 mb-20">
        <div className="space-y-5 fade-left animate-on-scroll">
          <p className="tag tag-white">Featured</p>
          <h2 className="subtitle">Having Financial Troubles??. You Can Apply For Credit Today!</h2>

          <ul className="space-y-[12px] benefits">
            <li>
              Extra Spending Power when you have Neural Cash   
            </li>

            <li>Your data, protected with cutting edge encryption</li>

            <li>
              We're committed to giving instant feedback on your financial
              standing
            </li>

            <li>We're committed to adding more exciting features!</li>
          </ul>

          
        </div>

        <img
          src="/credit_score_simplified.svg"
          alt="Credit Score Simplified"
          className="fade-up animate-on-scroll delay-3"
        />
      </section>
    </div>
  );
};

export default AboutUs;
