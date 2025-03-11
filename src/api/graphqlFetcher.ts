
import { DocumentNode } from '@apollo/client';
import { apolloClient } from "@sd-ui-admin/api/apolloClient";

/**
 * GraphQL 요청을 처리하는 공통 함수
 * @param query GraphQL 쿼리
 * @param variables 쿼리에 필요한 변수 (선택)
 * @returns 응답 데이터
 */
export async function graphqlFetcher<T>(query: DocumentNode, variables?: Record<string, any>): Promise<T> {
  try {
    const { data } = await apolloClient.query({
      query,
      variables,
    });
    return data;
  } catch (error) {
    console.error('GraphQL Fetch Error:', error);
    throw error;
  }
}
