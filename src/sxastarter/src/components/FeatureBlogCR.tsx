import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

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

const FeatureBlogDefaultComponent = (props: FeatureBlogProps): JSX.Element => (
  <div className={`component promo feature blog`}>
    <div className="component-content">
      <span className="is-empty-hint">Feature Blog</span>
    </div>
  </div>
);

//https://andypaz.com/2020/10/21/creating-a-custom-rendering-contents-resolver/

export const Default = (props: FeatureBlogProps): JSX.Element => {
  //   const ds = props.fields.data.datasource;
  console.log(props);

  //   if (ds) {
  //     return (
  //       <div className={`component promo feature blog `} id="123">
  //         <div className="component-content">
  //           <div className="field-promoicon">
  //             <JssImage field={ds.PromoIcon.jsonValue} />
  //           </div>
  //           <div className="promo-text">
  //             <div>
  //               <div className="field-promotext">
  //                 <JssRichText field={ds.PromoText.jsonValue} />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  return <FeatureBlogDefaultComponent {...props} />;
};
