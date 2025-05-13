import React from "react";

// Static data for customer reviews
const customerReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Artisan Bakeries Inc.",
    position: "Operations Director",
    review:
      "F.I.N.D.R. helped us locate the perfect industrial mixer that fit our budget and production needs. Their expertise saved us weeks of research.",
    rating: 3,
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    company: "Fresh Produce Processing",
    position: "CEO",
    review:
      "When our production line needed an upgrade, F.I.N.D.R. guided us to machinery that increased our capacity by 40% while staying within our budget constraints.",
    rating: 5,
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Janet Wu",
    company: "Pacific Seafood Co.",
    position: "Procurement Manager",
    review:
      "The specialized refrigeration equipment F.I.N.D.R. recommended perfectly met our unique requirements. Their industry knowledge is unmatched.",
    rating: 4,
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

// Company stats for About section
const companyStats = [
  { label: "Years in Business", value: "15+" },
  { label: "Happy Clients", value: "500+" },
  { label: "Equipment Matched", value: "2,000+" },
  { label: "Industry Partners", value: "45+" },
];

// Our team members
const teamMembers = [
  {
    name: "Swayam Shah",
    position: "Founder & CEO",
    bio: "Swayam, a 3rd-year engineering student and the brain behind F.I.N.D.R, is passionate about solving real-world problems in the food manufacturing space and started F.I.N.D.R. to make it easier for businesses to discover the right machinery—faster, smarter, and hassle-free.",
    imageUrl: "/profilePic.jpg",
  },
  {
    name: "Pratham Malavia",
    position: "Technical Director",
    bio: "Pratham, also in his 3rd year of engineering, brings hands-on tech expertise to F.I.N.D.R. He's all about making sure every machine we recommend checks the boxes for performance, quality, and innovation—so our clients can build smarter factories without second-guessing.",
    imageUrl: "/profilePic2.png",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero section */}
      <div className="bg-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Connecting Food Industry with Perfect Machinery
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Since 2010, F.I.N.D.R. has helped hundreds of food producers find
            the right equipment to grow their business.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              F.I.N.D.R. stands for Food Industry New Device Resources. We're
              dedicated to helping food industry stakeholders find the right
              machinery for their specific needs.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Our team combines decades of experience in food manufacturing with
              technical expertise to ensure every client finds equipment that
              maximizes efficiency, quality, and return on investment.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Whether you're a small artisanal producer or a large-scale
              manufacturer, we analyze your unique requirements to match you
              with machinery that will help your business thrive.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {companyStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <p className="text-3xl font-bold text-green-600">
                  {stat.value}
                </p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our team */}
        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Our Leadership Team
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            The faces behind F.I.N.D.R. bring together expertise from food
            production, engineering, and technology.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 items-center md:items-start"
              >
                <img
                  className="h-32 w-32 rounded-full object-cover bg-white"
                  src={member.imageUrl}
                  alt={member.name}
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-medium">
                    {member.position}
                  </p>
                  <p className="mt-2 text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer testimonials */}
        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Don't just take our word for it. Here's what food industry
            professionals have to say about working with F.I.N.D.R.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {customerReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full mr-4"
                    src={review.imageUrl}
                    alt={review.name}
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {review.position}, {review.company}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-20 bg-green-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to find your perfect machinery match?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Whether you're scaling up production, replacing outdated equipment,
            or launching a new product line, we're here to help.
          </p>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
            >
              Contact Our Experts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
