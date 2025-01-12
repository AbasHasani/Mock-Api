import React from "react";

const page = () => {
  return (
    <div className="md:mx-10 p-3 bg-slate-900 rounded-sm">
      <p className="bg-slate-800 p-3 rounded-sm mb-2">
        To create a new api go to home, and chose one between manual and ai
        generated json and make your json. then make sure it's a valid json and
        then create the api.
      </p>
      <p className="bg-slate-800 p-3 rounded-sm mb-2">
        To use the api you can go to /api/{`{your-api-name}/{your-api-id}`} and
        access the data there.
      </p>
      <p className="bg-slate-800 p-3 rounded-sm mb-2">
        <span className="block">
          To access a field in the api, for example to get a single product in
          products use api/{`{your-api-name}`}/{`{your-api-id}`}/
          {`{filed-you-want}`}/{`{fild-id}`}.
        </span>
        <span>
          for example to get product with id of 1 in:{" "}
          {`{products: [{id: 1, name: "Car"}]}`} go to {`/product/1/products/1`}
        </span>
      </p>
    </div>
  );
};

export default page;
