const Partners = () => {
  return (
    <section className="bg-[#00B512]">
      <div className="container">
        <div className="flex justify-between py-5 gap-4">
          <img
            src="/achieve-logo-transparent.svg"
            alt="Spherule"
            style={{ width: "90px" }}
          />
          <img
            src="/mtn-mobile-logo-icon.svg"
            alt="MTN momo"
            style={{ width: "90px", height: "50px" }}
          />
          <img
            src="/vodafone-icon.svg"
            alt="telecel"
            style={{ width: "90px", height: "50px" }}
          />
          <img src="/amazon_pay.svg" alt="Amazon" />
          <img src="/paypal.svg" alt="Paypal" />
          <img src="/alipay.svg" alt="Alipay" />
        </div>
      </div>
    </section>
  );
};

export default Partners;
