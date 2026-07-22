import { useState } from 'react';
import { CorporateCaseTrackerPanel } from './CorporateCaseTrackerPanel';
import { CorporateIntakeWizard } from './CorporateIntakeWizard';

export function ClientCorporateSuiteTab() {
  const [showTracker, setShowTracker] = useState(false);
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 animate-fade-in">
      <CorporateIntakeWizard onComplete={() => setShowTracker(true)} />
      {showTracker && <CorporateCaseTrackerPanel currentStage="DRAFT" externalReference={null} />}
    </div>
  );
}
