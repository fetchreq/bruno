import React from 'react';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import CodeEditor from 'components/CodeEditor';
import { updateCollectionTests } from 'providers/ReduxStore/slices/collections';
import { saveCollectionRoot } from 'providers/ReduxStore/slices/collections/actions';
import { useTheme } from 'providers/Theme';
import StyledWrapper from './StyledWrapper';

const Tests = ({ collection }) => {
  const dispatch = useDispatch();
  const tests = get(collection, 'root.request.tests', '');

  const { storedTheme } = useTheme();
  const preferences = useSelector((state) => state.app.preferences);

  const onEdit = (value) => {
    dispatch(
      updateCollectionTests({
        tests: value,
        collectionUid: collection.uid
      })
    );
  };

  const handleSave = () => dispatch(saveCollectionRoot(collection.uid));

  return (
    <StyledWrapper className="w-full flex flex-col h-full">
      <CodeEditor
        collection={collection}
        value={tests || ''}
        theme={storedTheme}
        onEdit={onEdit}
        mode="javascript"
        onSave={handleSave}
        font={get(preferences, 'font.codeFont', 'default')}
      />

      <div className="mt-6">
        <button type="submit" className="submit btn btn-sm btn-secondary" onClick={handleSave}>
          Save
        </button>
      </div>
    </StyledWrapper>
  );
};

export default Tests;
