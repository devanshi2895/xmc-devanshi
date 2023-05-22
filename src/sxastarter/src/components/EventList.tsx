import React from 'react';
import { Image as JssImage, ImageField, Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  data: {
    contextItem: {
      children: {
        results: {
          Title: Field<string>;
          EventUrl: {
            url: string;
          };
          Description: Field<string>;
          Thumbnail: { jsonValue: { value: ImageField } };
        }[];
      };
    };
  };
}

type EventListProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const EventListDefaultComponent = (): JSX.Element => (
  <div className={`component EventList`}>
    <div className="component-content">
      <span className="is-empty-hint">Event List</span>
    </div>
  </div>
);

export const Default = (props: EventListProps): JSX.Element => {
  const result = props.fields.data?.contextItem?.children?.results;
  //console.log(props.fields.data?.contextItem?.children);

  if (result) {
    return (
      <>
        {result.map((res, index) => {
          console.log(res);

          return (
            <div key={index} className="card" style={{ width: '30rem' }}>
              <JssImage field={res.Thumbnail.jsonValue.value} className="card-img-top" />

              <div className="card-body">
                <Text field={res.Title} tag="h5" className="card-title"></Text>

                <Text field={res.Description} className="card-text" tag="p" />

                <a href={res.EventUrl.url} className="btn btn-primary">
                  View Detail
                </a>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return <EventListDefaultComponent />;
};
