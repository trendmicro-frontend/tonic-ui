import { useState } from 'react';
import { Stack } from '@tonic-ui/react';
import BundleComposition from './BundleComposition';
import { measuredConfigs } from './data';
import LargestModules from './LargestModules';
import NetworkCost from './NetworkCost';
import PerformanceOverview from './PerformanceOverview';
import RequestTimeline from './RequestTimeline';
import StrategyOverview from './StrategyOverview';

// Configurations with no measured graph (the artifact is not published yet) are
// shown in the comparison rows but cannot feed the timeline or module tables.
export default function NetworkComparison() {
  const [metric, setMetric] = useState('requests');
  const [selected, setSelected] = useState(() => measuredConfigs.length - 1);
  const active = measuredConfigs[selected] ?? measuredConfigs[0];
  const maxBucket = Math.max(...active.waterfall.map((bucket) => bucket.requests), 1);
  const lastBucketStart = Math.max(...active.waterfall.map((bucket) => bucket.start), 0);
  const bucketCount = Math.floor(lastBucketStart / 100) + 1;
  const bucketByStart = new Map(active.waterfall.map((bucket) => [bucket.start, bucket]));
  const timelineBuckets = Array.from({ length: bucketCount }, (_, index) => (
    bucketByStart.get(index * 100) ?? {
      start: index * 100,
      requests: 0,
      transferredKiB: 0,
    }
  ));
  const timeTicks = [...timelineBuckets.map((bucket) => bucket.start), bucketCount * 100];

  return (
    <Stack spacing="4x" py="4x">
      <StrategyOverview />
      <PerformanceOverview />
      <NetworkCost metric={metric} setMetric={setMetric} />
      <BundleComposition />
      <RequestTimeline
        active={active}
        selected={selected}
        setSelected={setSelected}
        timelineBuckets={timelineBuckets}
        maxBucket={maxBucket}
        timeTicks={timeTicks}
      />
      <LargestModules active={active} selected={selected} />
    </Stack>
  );
}

export { default as FallbackFlow } from './FallbackFlow';
export { default as SetupExplorer } from './SetupExplorer';
