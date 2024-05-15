/* eslint-disable */

/* tslint:disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export interface CreateTodoDto {
  /**
   * 할 일 제목
   * @example "세탁기 돌리기"
   */
  title: string;
}

export interface Client {
  /**
   * 클라이언트 ID
   * @example 1
   */
  id: number;
  /**
   * 클라이언트 이름
   * @example "Yongjun Park"
   */
  name: string;
}

export interface CreateTodoResponseDto {
  /**
   * 할 일 ID
   * @example 1
   */
  id: number;
  /**
   * 할 일 제목
   * @example "세탁기 돌리기"
   */
  title: string;
  /**
   * 할 일 설명
   * @example "흰 옷, 검은 옷 구분하기"
   */
  description?: string;
  /**
   * 할 일 완료 여부
   * @example false
   */
  isDone: boolean;
  /**
   * 할 일 생성 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 할 일 수정 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  updatedAt: string;
  /**
   * 할 일을 등록한 클라이언트
   * @example {"id":1,"name":"Yongjun Park"}
   */
  client: Client;
}

export interface ReadTodoResponseDto {
  /**
   * 할 일 ID
   * @example 1
   */
  id: number;
  /**
   * 할 일 제목
   * @example "세탁기 돌리기"
   */
  title: string;
  /**
   * 할 일 설명
   * @example "흰 옷, 검은 옷 구분하기"
   */
  description?: string;
  /**
   * 할 일 완료 여부
   * @example false
   */
  isDone: boolean;
  /**
   * 할 일 생성 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 할 일 수정 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  updatedAt: string;
  /**
   * 할 일을 등록한 클라이언트
   * @example {"id":1,"name":"Yongjun Park"}
   */
  client: Client;
}

export interface UpdateTodoDto {
  /**
   * 할 일 제목
   * @example "세탁기 돌리기"
   */
  title?: string;
  /**
   * 할 일 설명
   * @example "흰 옷, 검은 옷 구분하기"
   */
  description?: string;
  /**
   * 할 일 완료 여부
   * @example false
   */
  isDone?: boolean;
}

export interface UpdateTodoResponseDto {
  /**
   * 할 일 ID
   * @example 1
   */
  id: number;
  /**
   * 할 일 제목
   * @example "세탁기 돌리기"
   */
  title: string;
  /**
   * 할 일 설명
   * @example "흰 옷, 검은 옷 구분하기"
   */
  description?: string;
  /**
   * 할 일 완료 여부
   * @example false
   */
  isDone: boolean;
  /**
   * 할 일 생성 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 할 일 수정 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  updatedAt: string;
  /**
   * 할 일을 등록한 클라이언트
   * @example {"id":1,"name":"Yongjun Park"}
   */
  client: Client;
}

export interface CreateClientDto {
  /**
   * 클라이언트 이름
   * @example "Yongjun Park"
   */
  name: string;
}

export interface CreateClientResponseDto {
  /**
   * 클라이언트 ID
   * @example 1
   */
  id: number;
  /**
   * 클라이언트 이름
   * @example "Yongjun Park"
   */
  name: string;
}

export interface QuestionParam {
  /**
   * 질문 키
   * @example "childhoodDream"
   */
  key: string;
  /**
   * 질문 타입 (text, integer, double, boolean, email, tel, url, color, date, datetime, json)
   * @example "text"
   */
  type?: string;
  /**
   * 질문 타입의 배열 여부
   * @example false
   */
  isArray?: boolean;
  /**
   * 질문 선택 여부
   * @example false
   */
  isOptional?: boolean;
}

export interface CreateSchemaDto {
  /**
   * 질문 목록
   * @example [{"key":"age","type":"integer"},{"key":"gender"},{"key":"mbti"},{"key":"childhoodDream"},{"key":"mostImportantValue","isArray":true},{"key":"lifeSatisfaction","type":"integer"},{"key":"email","type":"email","isOptional":true}]
   */
  questions: QuestionParam;
}

export interface CreateSchemaResponseDto {
  /**
   * 스키마 ID
   * @example 1
   */
  id: number;
  /** 스키마를 등록한 클라이언트 */
  client: Client;
}

export interface CreateFormDto {
  /**
   * 폼 데이터
   * @example {"age":23,"gender":"male","mbti":"ISTJ","childhoodDream":"유튜버","mostImportantValue":["family","etc"],"lifeSatisfaction":6,"email":"yopark.dev@naver.com"}
   */
  data: object;
}

export interface Schema {
  /**
   * 스키마 ID
   * @example 1
   */
  id: number;
  /** 스키마를 등록한 클라이언트 */
  client: Client;
}

export interface CreateFormResponseDto {
  /**
   * 폼 ID
   * @example 1
   */
  id: number;
  /**
   * 폼 생성 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  createdAt: string;
  /** 해당 폼의 스키마 */
  schema: Schema;
}

export interface Question {
  /**
   * 질문 ID
   * @example 1
   */
  id: number;
  /**
   * 질문 키
   * @example "childhoodDream"
   */
  key: string;
  /**
   * 질문 타입 (text, integer, double, boolean, email, tel, url, color, date, datetime, json)
   * @example "text"
   */
  type?: string;
  /**
   * 질문 타입의 배열 여부
   * @example false
   */
  isArray?: boolean;
  /**
   * 질문 선택 여부
   * @example false
   */
  isOptional?: boolean;
  /** 질문이 속한 스키마 */
  schema: Schema;
}

export interface Form {
  /**
   * 폼 ID
   * @example 1
   */
  id: number;
  /**
   * 폼 생성 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  createdAt: string;
  /** 해당 폼의 스키마 */
  schema: Schema;
}

export interface AnswerWithQuestion {
  /**
   * 답변 ID
   * @example 1
   */
  id: number;
  /**
   * 답변 값 (문자열)
   * @example "Yongjun Park"
   */
  stringValue?: string;
  /**
   * 답변 값 (정수)
   * @example 123
   */
  integerValue?: number;
  /**
   * 답변 값 (실수)
   * @example 123.45
   */
  doubleValue?: number;
  /**
   * 답변 값 (불리언)
   * @example true
   */
  booleanValue?: boolean;
  /**
   * 답변 값 (날짜)
   * @format date-time
   * @example "2021-07-01"
   */
  dateValue?: string;
  /** 어느 질문에 대한 답변인지 */
  question: Question;
  /** 답변이 속한 폼 */
  form: Form;
}

export interface ReadFormResponseDto {
  /**
   * 폼 ID
   * @example 1
   */
  id: number;
  /**
   * 폼 생성 일시
   * @format date-time
   * @example "2021-07-01T00:00:00.000Z"
   */
  createdAt: string;
  /** 해당 폼의 스키마 */
  schema: Schema;
  answers: AnswerWithQuestion[];
}

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title 우테코 따라잡기 API 문서
 * @version v0.1.0
 * @externalDocs https://github.com/not-woowacourse
 * @contact
 *
 * 이걸 만든 사람은 백엔드 개발자가 아닙니다. 사용해보시고 오류나 빈틈이 있으면 채널톡 부탁드립니다 😭 <br /><br />📝 API 태그 넘버링 기준<ul><li>0. 공통으로 사용하는 API</li><li>1. toodoo 과제에서 사용하는 API</li><li>2. surveey 과제에서 사용하는 API</li></ul>
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 0.1. App
   * @name AppControllerGetHello
   * @summary 헬스 체크
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  todos = {
    /**
     * No description
     *
     * @tags 1.1. Todos
     * @name TodosControllerCreate
     * @summary 할 일 생성
     * @request POST:/todos
     */
    todosControllerCreate: (data: CreateTodoDto, params: RequestParams = {}) =>
      this.request<CreateTodoResponseDto, void>({
        path: `/todos`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 1.1. Todos
     * @name TodosControllerFindAll
     * @summary 모든 할 일 조회
     * @request GET:/todos
     */
    todosControllerFindAll: (params: RequestParams = {}) =>
      this.request<ReadTodoResponseDto[], void>({
        path: `/todos`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 1.1. Todos
     * @name TodosControllerFindOne
     * @summary 할 일 조회
     * @request GET:/todos/{id}
     */
    todosControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<ReadTodoResponseDto, void>({
        path: `/todos/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 1.1. Todos
     * @name TodosControllerUpdate
     * @summary 할 일 수정
     * @request PATCH:/todos/{id}
     */
    todosControllerUpdate: (
      id: string,
      data: UpdateTodoDto,
      params: RequestParams = {},
    ) =>
      this.request<UpdateTodoResponseDto, void>({
        path: `/todos/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 1.1. Todos
     * @name TodosControllerRemove
     * @summary 할 일 삭제
     * @request DELETE:/todos/{id}
     */
    todosControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/todos/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  clients = {
    /**
     * @description 과제 진행자 간 데이터 분리를 위해 사전에 클라이언트를 등록해야 합니다.
     *
     * @tags 0.2. Clients
     * @name ClientsControllerCreate
     * @summary 클라이언트 등록
     * @request POST:/clients
     */
    clientsControllerCreate: (
      data: CreateClientDto,
      params: RequestParams = {},
    ) =>
      this.request<CreateClientResponseDto, void>({
        path: `/clients`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  schemas = {
    /**
     * @description 설문마다 스키마가 다르므로 폼을 제출하기 전에 스키마를 등록해야 합니다.
     *
     * @tags 2.1. Schemas
     * @name SchemasControllerCreate
     * @summary 스키마 등록
     * @request POST:/schemas
     */
    schemasControllerCreate: (
      data: CreateSchemaDto,
      params: RequestParams = {},
    ) =>
      this.request<CreateSchemaResponseDto, void>({
        path: `/schemas`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  forms = {
    /**
     * No description
     *
     * @tags 2.2. Forms
     * @name FormsControllerCreate
     * @summary 폼 제출
     * @request POST:/forms/{schemaId}
     */
    formsControllerCreate: (
      schemaId: string,
      data: CreateFormDto,
      params: RequestParams = {},
    ) =>
      this.request<CreateFormResponseDto, void>({
        path: `/forms/${schemaId}`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 2.2. Forms
     * @name FormsControllerFindAll
     * @summary 모든 폼 조회
     * @request GET:/forms/{schemaId}
     */
    formsControllerFindAll: (schemaId: string, params: RequestParams = {}) =>
      this.request<ReadFormResponseDto[], void>({
        path: `/forms/${schemaId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 2.2. Forms
     * @name FormsControllerFindOneById
     * @summary 폼 조회
     * @request GET:/forms/{schemaId}/{id}
     */
    formsControllerFindOneById: (
      schemaId: string,
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<ReadFormResponseDto, void>({
        path: `/forms/${schemaId}/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags 2.2. Forms
     * @name FormsControllerRemove
     * @summary 폼 삭제
     * @request DELETE:/forms/{id}
     */
    formsControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/forms/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
}
