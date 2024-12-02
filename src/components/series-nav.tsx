import type { FC } from 'react';
import type { AllMetaData } from './types';
import SeriesNavButton from './series-nav-button';

const Flex: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        display: flex;
        margin-top: 40px;
      }
    `}</style>
  </>
);

const Spacer: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        flex-grow: 1;
      }
    `}</style>
  </>
);

interface Props {
  allMetaData: AllMetaData;
}
const SeriesNav: FC<Props> = ({ allMetaData: { folderLink, metaDataDict, seriesData } }) => {
  if (seriesData?.config?.order == null) return <></>;
  const prevData = metaDataDict[`${folderLink}/${seriesData.config.order[seriesData.index - 1]}`];
  const nextData = metaDataDict[`${folderLink}/${seriesData.config.order[seriesData.index + 1]}`];
  return (
    <Flex>
      {prevData && <SeriesNavButton num={seriesData.index} navData={prevData} />}
      <Spacer />
      {nextData && <SeriesNavButton num={seriesData.index + 2} navData={nextData} />}
    </Flex>
  );
};

export default SeriesNav;
