import React from 'react';
import { Field, Text, ImageField, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  items: {
    id: string;
    url: string;
    name: string;
    fields: {
      Title: Field<string>;
      Description: Field<string>;
      EventLocation: Field<string>;
      Thumbnail: ImageField;
    };
  }[];
}

type RelatedEventsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const RelatedEventsDefaultComponent = (): JSX.Element => (
  <div className={`component promo related events`}>
    <div className="component-content">
      <span className="is-empty-hint">Related Events</span>
    </div>
  </div>
);

//https://andypaz.com/2020/10/21/creating-a-custom-rendering-contents-resolver/

export const Default = (props: RelatedEventsProps): JSX.Element => {
  const result = props.fields?.items;
  console.log(props);

  if (result && result.length > 0) {
    return (
      <>
        <div className="container">
          <div className="row row-cols-2 row-cols-lg-3">
            {result.slice(0, 3).map((res) => {
              return (
                <div className="col" key={res.id}>
                  <div className="card" style={{ width: '30rem' }}>
                    <JssImage
                      field={res?.fields?.Thumbnail}
                      className="card-img-top"
                      height="200"
                      width="204"
                    />

                    <div className="card-body">
                      <Text field={res?.fields?.Title} tag="h3" className="card-title"></Text>

                      <Text field={res?.fields?.EventLocation} className="card-text" tag="p" />

                      <a href={res?.url} className="btn btn-primary">
                        View Detail
                      </a>
                    </div>
                  </div>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
  return <RelatedEventsDefaultComponent />;
};
