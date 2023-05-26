import React from 'react';
import Link from 'next/link';
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
        <div className="container">
          <div className="row row-cols-2 row-cols-lg-3">
            {result.map((res, index) => {
              console.log('inside event list');
              console.log(res.EventUrl);
              return (
                <div className="col" key={index}>
                  <div className="card" style={{ width: '30rem' }}>
                    <JssImage
                      field={res.Thumbnail.jsonValue.value}
                      className="card-img-top"
                      height="200"
                      width="204"
                    />

                    <div className="card-body">
                      <Text field={res.Title} tag="h3" className="card-title"></Text>

                      <Text field={res.Description} className="card-text" tag="p" />

                      <Link href={res.EventUrl.url} className="btn btn-warning">
                        <a>View Detail</a>
                      </Link>

                      {/* <a href={res.EventUrl.url} className="btn btn-primary">
                        View Detail
                      </a> */}
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

  return <EventListDefaultComponent />;
};
