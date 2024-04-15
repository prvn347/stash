import { TypeAnimation } from "react-type-animation";

export const Quote = () => {
  return (
    <div>
      <div className=" flex  justify-center h-screen bg-newpurple">
        <div className=" flex flex-col justify-center">
          <div>
            <div className=" w-72  font-bold text-2xl  text-white ">
              <TypeAnimation
                sequence={[
                  "Payment easier for Individuals",
                  1000,
                  "Payment easier for samll businesses",
                  1000,
                  "Payment easier for education",
                  1000,
                  "Payment easier for shops.",
                  1000,
                ]}
                speed={50}
                style={{ fontSize: "2em" }}
                repeat={Infinity}
              />
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};
