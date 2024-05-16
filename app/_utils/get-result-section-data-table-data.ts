import {
  type AnswerWithQuestion,
  type FormsControllerFindAllData,
  type SchemasControllerFindOneData,
} from '@/__generated__/data-contracts';
import { type AnswerValue } from '@/types/answer-value';

type GetResultSectionDataTableDataParams = {
  schema: SchemasControllerFindOneData;
  forms: FormsControllerFindAllData;
};

const getResultSectionDataTableData = ({
  schema,
  forms,
}: GetResultSectionDataTableDataParams) => {
  const headers = [
    'id',
    'createdAt',
    ...schema.questions.map((question) => question.key),
  ];

  const data = forms.map((form) => ({
    id: form.id,
    createdAt: form.createdAt,
    ...getDestructuredAnswers(form.answers),
  }));

  return { headers, data };
};

const getDestructuredAnswers = (answers: AnswerWithQuestion[]) => {
  return answers.reduce(
    (acc, answer) => {
      acc[answer.question.key] = getAnswerValue(answer);
      return acc;
    },
    {} as Record<string, AnswerValue>,
  );
};

const getAnswerValue = (answer: AnswerWithQuestion): AnswerValue => {
  if (answer.stringValue !== undefined && answer.stringValue !== null) {
    return answer.stringValue;
  }

  if (answer.integerValue !== undefined && answer.integerValue !== null) {
    return answer.integerValue;
  }

  if (answer.doubleValue !== undefined && answer.doubleValue !== null) {
    return answer.doubleValue;
  }

  if (answer.booleanValue !== undefined && answer.booleanValue !== null) {
    return answer.booleanValue;
  }

  if (answer.dateValue !== undefined && answer.dateValue !== null) {
    return new Date(answer.dateValue);
  }

  return null;
};

export { getResultSectionDataTableData };
