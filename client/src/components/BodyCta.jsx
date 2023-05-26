import React from "react";

const BodyCta = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 p-10">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-green-600 mt-[-100px]">
                Quick overview
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Mountain
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Mt. Kalisungan, a rising tourist attraction in South Luzon noted
                for its beauty, is definitely attractive, particularly for those
                who enjoy hiking, trekking, and mountain climbing.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[-100px] p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 ">
          <iframe
            className="mapbox rounded-3xl"
            width="100%"
            height="400px"
            src="https://api.mapbox.com/styles/v1/admin1233/cl5n0lhv2000014ny4w5mktye.html?title=false&access_token=pk.eyJ1IjoiYWRtaW4xMjMzIiwiYSI6ImNsNTRhNnNheTB4aTMza215dzlndW0zOXgifQ.dQ6Mu8nTg2cB9bWoeumU-w&zoomwheel=false#16.18/14.145303/121.3305/99.7/67"
            title="Outdoors-copy"
          ></iframe>
          <h2 className="mt-10">
            Mt. Kalisungan has a total height gain of 587 meters and a maximum
            altitude of 700 meters.
          </h2>
          {/* <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt=""
          /> */}
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              {/* <p>
                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
                risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                Id dolor praesent donec est. Odio penatibus risus viverra tellus
                varius sit neque erat velit. Faucibus commodo massa rhoncus,
                volutpat. Dignissim sed eget risus enim. Mattis mauris semper
                sed amet vitae sed turpis id.
              </p> */}
              <ul role="list" className="space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Explore our location.
                    </strong>{" "}
                    We are situated in the beautiful Brgy. Lamot 2 Calauan
                    Laguna, surrounded by stunning landscapes and breathtaking
                    views.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Book your adventure online.
                    </strong>{" "}
                    Our easy-to-use online booking system will guide and inform
                    you about our exciting range of hikes and trails.
                    <br />
                    <a
                      href="Book"
                      className="text-green-600 font-semibold hover:underline"
                    >
                      Book now!
                    </a>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Local Tourist Guides.
                    </strong>{" "}
                    Our experienced and knowledgeable tour guides are locals of
                    Calauan Laguna and are officially registered in our system.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Discover our trails.
                    </strong>{" "}
                    Our trails range from 1-2 days to 2.5-3 hours to summit, and
                    offer a 360-degree view of the Southern Tagalog highlands
                    and San Pablo's seven lakes. Join us on an adventure you'll
                    never forget.
                  </span>
                </li>
              </ul>
              {/* <p className="mt-8">
                Trails class needing 1-2 days required/hours to summit is 1
                day/2.5-3 hours and boasts a 360-degree view of the Southern
                Tagalog highlands and the view of San Pablo's seven lakes.
              </p> */}
              {/* <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                No server? No problem.
              </h2>
              <p className="mt-6">
                Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
                consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod
                vitae interdum mauris enim, consequat vulputate nibh. Maecenas
                pellentesque id sed tellus mauris, ultrices mauris. Tincidunt
                enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam
                turpis ipsum eu a sed convallis diam.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyCta;
