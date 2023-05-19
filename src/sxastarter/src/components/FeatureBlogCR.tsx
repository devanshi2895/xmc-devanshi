import React from 'react';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  items: {
    id: string;
    url: string;
    name: string;
    fields: {
      Title: Field<string>;
      Description: Field<string>;
      SubTitle: Field<string>;
    };
  }[];
}

type FeatureBlogProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FeatureBlogDefaultComponent = (): JSX.Element => (
  <div className={`component promo feature blog`}>
    <div className="component-content">
      <span className="is-empty-hint">Feature Blog</span>
    </div>
  </div>
);

//https://andypaz.com/2020/10/21/creating-a-custom-rendering-contents-resolver/

export const Default = (props: FeatureBlogProps): JSX.Element => {
  const ds = props.fields.items;
  console.log(props);

  if (ds) {
    return (
      <>
        <h1>Featured Blogs</h1>
        {ds.map((item) => {
          return (
            <div className={`component promo feature blog `} key={item.id}>
              <div className="component-content">
                <div className="promo-text">
                  <div className="field-promotext">
                    <h2>{item.name}</h2>
                    <Text field={item.fields.Title} />
                    <Text field={item.fields.Description} />
                    <Text field={item.fields.SubTitle} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return <FeatureBlogDefaultComponent />;
};
