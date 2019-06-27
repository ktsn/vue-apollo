import Vue from 'vue';
import { DocumentNode } from 'graphql';
import { FetchPolicy, MutationOptions } from 'apollo-client';
import { ApolloVueUpdateQueryFn } from './options';

export interface ApolloQueryProps<Variables = {}, Result = {}> {
  query: DocumentNode;
  variables?: Variables;
  fetchPolicy?: FetchPolicy;
  pollInterval?: number;
  notifyOnNetworkStatusChange?: boolean;
  context?: Record<string, any>;
  update?: (result: Result) => any;
  skip?: boolean;
  debounce?: number;
  throttle?: number;
  clientId?: string;
  deep?: boolean;
  tag?: string;
  prefetch?: boolean;
}

export interface ApolloMutationProps<Variables = {}, Result = {}> {
  mutation: DocumentNode;
  variables?: Variables;
  optimisticResponse?: object;
  update?: MutationOptions<Result>['update'];
  refetchQueries?: MutationOptions<Result>['refetchQueries'];
  clientId?: string;
  tag?: string;
}

export interface ApolloSubscribeToMoreProps<
  SubscriptionVariables = {},
  SubscriptionData = {},
  QueryVariables = {},
  QueryResult = {},
> {
  document: DocumentNode
  variables?: SubscriptionVariables
  updateQuery?: ApolloVueUpdateQueryFn<Vue, QueryResult, QueryVariables, SubscriptionData>
}
