import React from 'react';
import {
  Image as JssImage,
  RichText as JssRichText,
  ImageField,
  Field,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  PromoIcon: ImageField;
  PromoText: Field<string>;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PromoDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Test Promo</span>
    </div>
  </div>
);

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const ds = props.fields;
  // console.log(props.fields.data.datasource);

  if (ds) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={ds.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText field={ds.PromoText} />
              </div>
            </div>
            {/* <div className="field-promolink">
              <JssLink field={ds.PromoLink} />
            </div> */}
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const WithoutImage = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const ds = props.fields;

  if (ds) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <Text className="promo-text" field={ds.PromoText} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
