<template>
  <div>
    <v-card
      class="mx-auto mb-2"
      outlined
      v-for="question in questions"
      :key="question.uid"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>{{ question.title }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ question.content }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            answes: {{ question.answersNumber }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Loading",

  data() {
    return {
      questions: [
        {
          uid: "de885ecd-0085-4912-b619-02c6a9c88d7c",
          title: "Cumque ut veritatis laboriosam ut autem.",
          content:
            "Molestiae quia neque porro. Iusto repudiandae ipsum recusandae aspernatur est reprehenderit tempore. Optio reprehenderit repudiandae suscipit non qui nesciunt maiores quos quia. Dolorum qui eos autem necessitatibus. Quia laudantium non dolorum veniam cum vitae.",
          answersNumber: 96048,
        },
        {
          uid: "162828ed-4cb7-40d4-b660-acd028209fa4",
          title: "Tempore quas facilis ratione.",
          content:
            "Non et quia quos aut deleniti aperiam voluptate velit dolores. Voluptatem dolores cumque dolores animi placeat.",
          answersNumber: 79691,
        },
        {
          uid: "2f0c1f31-79c0-4040-b9ef-7ce37edc53b7",
          title: "Iste beatae vel enim labore.",
          content:
            "Velit et aut rerum maiores. Sit molestias eveniet veritatis non commodi quam perspiciatis id. Incidunt quibusdam tempora consequuntur id. Qui sint quibusdam atque error eos inventore sint. Libero consequuntur est reprehenderit praesentium sunt voluptatem rem. Explicabo error voluptas sapiente vel.",
          answersNumber: 61887,
        },
        {
          uid: "b2015ae1-f881-486b-b586-f72aa3b21da5",
          title: "Quos et nesciunt amet.",
          content: "Nam porro ea sit. Recusandae voluptas aut. Qui quia sit.",
          answersNumber: 51427,
        },
        {
          uid: "753472f5-08ef-4577-9d84-ede6feb7475b",
          title: "Incidunt id expedita itaque officia natus et assumenda.",
          content:
            "Odio voluptate accusantium ipsum eum odit voluptatem et molestias itaque. Enim sed placeat ab. Incidunt sed qui. Porro hic unde nostrum sequi et provident. Sint corrupti inventore error aspernatur voluptates. Neque molestias optio quaerat corporis autem reprehenderit.",
          answersNumber: 99866,
        },
      ],
    };
  },

  methods: {},
};
</script>
