import gql from 'graphql-tag';
import Vue from 'vue';
import { ApolloQueryProps, ApolloMutationProps, ApolloSubscribeToMoreProps } from '../';

interface TagList {
  tags: {
    id: string;
    label: string;
  }[];
}

interface TagListVariables {
  type: string;
}

interface AddTag {
  addTag: {
    id: string;
    label: string;
  };
}

interface AddTagVariables {
  type: string;
  label: string;
}

interface TagAdded {
  tagAdded: {
    id: string;
    label: string;
    type: string;
  };
}

interface TagAddedVariables {
  type: string;
}

export default Vue.extend({
  computed: {
    queryProps(): ApolloQueryProps<TagListVariables, TagList> {
      return {
        query: gql`query tagList ($type: String!) {
          tags(type: $type) {
            id
            label
          }
        }`,
        variables: {
          type: ''
        },
        fetchPolicy: 'cache-first',
        clientId: 'default',
        pollInterval: 1000,
        notifyOnNetworkStatusChange: true,
        context: {},
        update: result => result.tags.map(tag => tag.label),
        skip: false,
        debounce: 100,
        throttle: 100,
        deep: true,
        tag: 'div',
        prefetch: true
      };
    },

    mutationProps(): ApolloMutationProps<AddTagVariables, AddTag> {
      return {
        mutation: gql`mutation ($type: String!, $label: String!) {
          addTag(type: $type, label: $label) {
            id
            label
          }
        }`,
        variables: {
          type: '',
          label: ''
        },
        optimisticResponse: {
          addTag: {
            __typename: 'Tag',
            id: '1',
            label: ''
          }
        },
        update: (cache, result) => {
          const data = cache.readQuery<TagList, TagListVariables>({
            query: gql``,
            variables: {
              type: ''
            }
          });

          cache.writeQuery<TagList, TagListVariables>({
            query: gql``,
            variables: {
              type: ''
            },
            data: {
              tags: data!.tags.concat(result.data!.addTag)
            }
          });
        },
        refetchQueries: result => {
          console.log(result.data!.addTag);
          return [
            {
              query: gql``,
              variables: {}
            }
          ];
        },
        clientId: 'default',
        tag: 'div'
      }
    },

    subscribeToMoreProps(): ApolloSubscribeToMoreProps<TagAddedVariables, TagAdded, TagListVariables, TagList> {
      return {
        document: gql`subscription tags($type: String!) {
          tagAdded(type: $type) {
            id
            label
            type
          }
        }`,
        variables: {
          type: ''
        },
        updateQuery: (prevResult, options) => {
          prevResult.tags[0].id;
          options.error;
          options.subscriptionData.data.tagAdded.id;
          options.variables!.type;
          return prevResult;
        }
      }
    }
  }
});
