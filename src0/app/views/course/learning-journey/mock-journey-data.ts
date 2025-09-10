import { BlockJourneySteps } from "./learning-journey-interface";



export function getBlockJourneySteps_mock(blockId: string): BlockJourneySteps {
  // Just return the journey data directly
  return {
    steps: [
      // {
      //   stepId: "video1",
      //   stepNo: 1,
      //   type: "video",
      //   typeText: "فيديو",
      //   typeIcon: "fa-video",
      //   title: "التفاعلات",
      //   description: "شاهد الفيديو التعليمي لفهم المفاهيم بشكل أفضل",
      //   difficulty: "easy",
      //   points: 10,
      //   challengeId: "video-arabic-intro",
      //   status: "not_started",
      //   startedAt: undefined,
      //   completedAt: undefined,
      //   currentMode: "view",
      //   practiceAttempts: 0,
      //   testAttempts: 0,
      //   resourceData: {
      //     resourceType: "video",
      //     resourceUrl: "assets/videos/30.mp4",
      //     minimumViewTime: 30,
      //     requireFullView: false,
      //     duration: 180,
      //     applyWatchingRules: false
      //   }
      // },

      // {
      //   stepId: "quran",
      //   stepNo: 1,
      //   type: "quran",
      //   typeText: "فيديو",
      //   typeIcon: "fa-video",
      //   title: "Quran",
      //   description: "شاهد الفيديو التعليمي لفهم المفاهيم بشكل أفضل",
      //   difficulty: "easy",
      //   points: 10,
      //   challengeId: "quran-1",
      //   status: "not_started",
      //   startedAt: undefined,
      //   completedAt: undefined,
      //   currentMode: "view",
      //   practiceAttempts: 0,
      //   testAttempts: 0,
      //   resourceData: {
      //     resourceType: "video",
      //     resourceUrl: "assets/videos/levers.mp4",
      //     minimumViewTime: 30,
      //     requireFullView: false,
      //     duration: 180,
      //     applyWatchingRules: false
      //   }
      // },


      // {
      //   stepId: "mcq-opt1",
      //   stepNo: 1,
      //   type: "mcq-default",
      //   typeText: "اختيار من متعدد",
      //   typeIcon: "fa-list-ul",
      //   title: "اختيار من متعدد",
      //   description: "أجب على أسئلة الاختيار من متعدد لإظهار فهمك للموضوع",
      //   difficulty: "easy",
      //   points: 15,
      //   passingThreshold: 95, // 60% passing threshold for this easier quiz
      //   challengeId: "challengeId",
      //   status: "not_started",
      //   startedAt: undefined,
      //   completedAt: undefined,
      //   currentMode: undefined,
      //   practiceAttempts: 0,
      //   practiceScore: undefined,
      //   testAttempts: 0,
      //   testScore: undefined,
      //   testPassed: undefined,
      //   timerSeconds: 30
      // },


      {
        stepId: "mcq-opt1",
        stepNo: 2,
        type: "mcq-default",
        typeText: "اختيار من متعدد",
        typeIcon: "fa-list-ul",
        title: "اختيار من متعدد",
        description: " Project Managment ",
        difficulty: "easy",
        points: 15,
        passingThreshold: 95, // 60% passing threshold for this easier quiz
        challengeId: "python",
        status: "not_started",
        startedAt: undefined,
        completedAt: undefined,
        currentMode: undefined,
        practiceAttempts: 0,
        practiceScore: undefined,
        testAttempts: 0,
        testScore: undefined,
        testPassed: undefined,
        timerSeconds: 30
      }, 
      // {
      //   stepId: "mcq-opt1",
      //   stepNo: 3,
      //   type: "mcq-default",
      //   typeText: "اختيار من متعدد",
      //   typeIcon: "fa-list-ul",
      //   title: "اختيار من متعدد",
      //   description: "marketing",
      //   difficulty: "easy",
      //   points: 15,
      //   passingThreshold: 95, // 60% passing threshold for this easier quiz
      //   challengeId: "angular",
      //   status: "not_started",
      //   startedAt: undefined,
      //   completedAt: undefined,
      //   currentMode: undefined,
      //   practiceAttempts: 0,
      //   practiceScore: undefined,
      //   testAttempts: 0,
      //   testScore: undefined,
      //   testPassed: undefined,
      //   timerSeconds: 30
      // }, {
      //   stepId: "mcq-opt1",
      //   stepNo: 4,
      //   type: "mcq-default",
      //   typeText: "اختيار من متعدد",
      //   typeIcon: "fa-list-ul",
      //   title: "اختيار من متعدد",
      //   description: "Finance",
      //   difficulty: "easy",
      //   points: 15,
      //   passingThreshold: 95, // 60% passing threshold for this easier quiz
      //   challengeId: "Finance",
      //   status: "not_started",
      //   startedAt: undefined,
      //   completedAt: undefined,
      //   currentMode: undefined,
      //   practiceAttempts: 0,
      //   practiceScore: undefined,
      //   testAttempts: 0,
      //   testScore: undefined,
      //   testPassed: undefined,
      //   timerSeconds: 30
      // },


    ],
    currentStepIndex: 0,
    currentMode: "practice",
    journeyStartedAt: undefined,
    journeyCompletedAt: undefined,
    totalScore: undefined
  };
}



export function getMcqChallengeData_mock(challengeId: string): any {
  // Mock data for MCQ challenges
  // Using switch statement instead of if-else chain
  switch (challengeId) {
    case 'challengeId':
      return {
        title: "شبه الجزيرة العربية والقبائل العربية",
        description: "اختبر معرفتك بتاريخ القبائل في شبه الجزيرة العربية",
        questions: [
          {
            id: "q1",
            text: "كيف كانت القبائل في شبه الجزيرة العربية تعيش قديماً؟",
            options: [
              { id: "a", text: "في مدن مستقرة" },
              { id: "b", text: "في قرى زراعية" },
              { id: "c", text: "بالترحال من مكان إلى آخر" },
              { id: "d", text: "في تجمعات سكنية ثابتة" }
            ],
            validationHash: btoa("c"),
            explanation: "سكنت شبه الجزيرة العربية قبائل متفرقة ترتحل من مكان إلى آخر للرعي أو للتجارة، وكان الترحال نمط الحياة السائد للكثير من القبائل العربية قديماً."
          },
          {
            id: "q2",
            text: "ما هي القبيلة التي اشتهرت برحلات التجارة إلى الشام واليمن؟",
            options: [
              { id: "a", text: "قبيلة تميم" },
              { id: "b", text: "قبيلة قريش" },
              { id: "c", text: "قبيلة خزاعة" },
              { id: "d", text: "قبيلة هوازن" }
            ],
            validationHash: btoa("b"),
            explanation: "كانت لقبيلة قريش رحلتان للتجارة إحداهما للشام والأخرى لليمن، وقد ورد ذكرهما في القرآن الكريم."
          },
          {
            id: "q3",
            text: "ما هو اسم رحلتي التجارة لقريش كما ورد في القرآن الكريم؟",
            options: [
              { id: "a", text: "رحلتي البر والبحر" },
              { id: "b", text: "رحلتي الشرق والغرب" },
              { id: "c", text: "رحلتي الشتاء والصيف" },
              { id: "d", text: "رحلتي التجارة والسياحة" }
            ],
            validationHash: btoa("c"),
            explanation: "وقد ورد ذكر رحلات قريش التجارية في القرآن الكريم باسم رحلتي الشتاء والصيف في سورة قريش."
          },
          {
            id: "q4",
            text: "ما هي وجهة رحلة الشتاء لقبيلة قريش؟",
            options: [
              { id: "a", text: "إلى الشام" },
              { id: "b", text: "إلى اليمن" },
              { id: "c", text: "إلى الهند" },
              { id: "d", text: "إلى مصر" }
            ],
            validationHash: btoa("b"),
            explanation: "كانت رحلة الشتاء لقبيلة قريش متجهة إلى اليمن في الجنوب حيث الطقس أكثر دفئاً في فصل الشتاء."
          },
          {
            id: "q5",
            text: "ما هي وجهة رحلة الصيف لقبيلة قريش؟",
            options: [
              { id: "a", text: "إلى الشام" },
              { id: "b", text: "إلى اليمن" },
              { id: "c", text: "إلى الهند" },
              { id: "d", text: "إلى مصر" }
            ],
            validationHash: btoa("a"),
            explanation: "كانت رحلة الصيف لقبيلة قريش متجهة إلى الشام في الشمال حيث الطقس أكثر اعتدالاً في فصل الصيف."
          },
          {
            id: "q6",
            text: "ما هو السبب الرئيسي لترحال القبائل في شبه الجزيرة العربية؟",
            options: [
              { id: "a", text: "الهرب من الحروب" },
              { id: "b", text: "البحث عن المياه والكلأ" },
              { id: "c", text: "الرعي والتجارة" },
              { id: "d", text: "البحث عن الذهب" }
            ],
            validationHash: btoa("c"),
            explanation: "كانت القبائل العربية ترتحل من مكان إلى آخر للرعي أو للتجارة، وكان ذلك السبب الرئيسي للترحال حيث اعتمدت معيشتهم على هذين النشاطين."
          },
          {
            id: "q7",
            text: "كيف كانت تنتهي النزاعات بين القبائل العربية غالباً؟",
            options: [
              { id: "a", text: "بإبادة القبيلة المهزومة" },
              { id: "b", text: "بعقد الصلح والتعايش" },
              { id: "c", text: "بتدخل الرومان" },
              { id: "d", text: "بهجرة القبيلة المهزومة" }
            ],
            validationHash: btoa("b"),
            explanation: "يحدث أحيانا بين القبائل النزاع والخصام، وتنتهي بعقد الصلح والتعايش فيما بينها، وكان هذا هو النمط السائد لإنهاء الخلافات بين القبائل."
          },
          {
            id: "q8",
            text: "في أي سورة من القرآن الكريم وردت الإشارة إلى رحلتي الشتاء والصيف؟",
            options: [
              { id: "a", text: "سورة الفيل" },
              { id: "b", text: "سورة قريش" },
              { id: "c", text: "سورة العلق" },
              { id: "d", text: "سورة المسد" }
            ],
            validationHash: btoa("b"),
            explanation: "وردت الإشارة إلى رحلتي الشتاء والصيف في سورة قريش: ﴿لِإِيلَافِ قُرَيْشٍ * إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ﴾"
          },
          {
            id: "q9",
            text: "ما أهمية التجارة لقبيلة قريش في الجاهلية؟",
            options: [
              { id: "a", text: "لم تكن مهمة لهم" },
              { id: "b", text: "كانت مصدر الترفيه" },
              { id: "c", text: "كانت المصدر الرئيسي للرزق" },
              { id: "d", text: "كانت مجرد نشاط ثانوي" }
            ],
            validationHash: btoa("c"),
            explanation: "كانت التجارة المصدر الرئيسي للرزق لقبيلة قريش، حيث نظموا رحلات تجارية منتظمة إلى الشام واليمن، وذكر القرآن الكريم أهمية هذه الرحلات في سورة قريش."
          },
          {
            id: "q10",
            text: "ما هي علاقة قبيلة قريش بمكة المكرمة؟",
            options: [
              { id: "a", text: "لم يكن لهم علاقة بها" },
              { id: "b", text: "كانوا سكان مكة وسدنة الكعبة" },
              { id: "c", text: "كانوا يزورونها للتجارة فقط" },
              { id: "d", text: "كانوا يحاربون سكانها" }
            ],
            validationHash: btoa("b"),
            explanation: "كانت قبيلة قريش هي القبيلة الرئيسية التي سكنت مكة المكرمة وتولت سدانة الكعبة المشرفة، وأصبحت مكة مركزاً تجارياً مهماً بفضل نشاطهم التجاري."
          },
          {
            id: "q11",
            text: "ما هو نمط العلاقات بين القبائل العربية وفقاً للنص؟",
            options: [
              { id: "a", text: "الحروب المستمرة" },
              { id: "b", text: "النزاع أحياناً ثم الصلح والتعايش" },
              { id: "c", text: "القطيعة التامة" },
              { id: "d", text: "الوحدة الدائمة" }
            ],
            validationHash: btoa("b"),
            explanation: "ويحدث أحيانا بين القبائل النزاع والخصام، وتنتهي بعقد الصلح والتعايش فيما بينها، مما يدل على أن العلاقات كانت تشهد نزاعات متقطعة تنتهي بالصلح."
          },
          {
            id: "q12",
            text: "ما هي أبرز الأنشطة الاقتصادية للقبائل العربية قبل الإسلام؟",
            options: [
              { id: "a", text: "الصناعة والتعدين" },
              { id: "b", text: "الزراعة المستقرة" },
              { id: "c", text: "الرعي والتجارة" },
              { id: "d", text: "صيد الأسماك" }
            ],
            validationHash: btoa("c"),
            explanation: "كانت القبائل العربية قبل الإسلام تعتمد بشكل رئيسي على الرعي والتجارة كأنشطة اقتصادية، حيث كانت ترتحل من مكان إلى آخر للرعي أو للتجارة."
          },
          {
            id: "q13",
            text: "ما سبب اختيار مواسم معينة للرحلات التجارية إلى الشام واليمن؟",
            options: [
              { id: "a", text: "لتجنب الحروب القبلية" },
              { id: "b", text: "بسبب الظروف المناخية" },
              { id: "c", text: "لتوافق مواعيد الأسواق" },
              { id: "d", text: "لتجنب قطاع الطرق" }
            ],
            validationHash: btoa("b"),
            explanation: "كانت الرحلات التجارية تتم في مواسم معينة بسبب الظروف المناخية، فكانت رحلة الشتاء إلى اليمن لتجنب برد الشمال، ورحلة الصيف إلى الشام لتجنب حر الجنوب."
          },
          {
            id: "q14",
            text: "ماذا يعني مصطلح 'إيلاف قريش' الوارد في القرآن الكريم؟",
            options: [
              { id: "a", text: "صلاة قريش" },
              { id: "b", text: "تعويد وإلف قريش" },
              { id: "c", text: "تحالف قريش" },
              { id: "d", text: "تجارة قريش" }
            ],
            validationHash: btoa("b"),
            explanation: "يشير مصطلح 'إيلاف قريش' إلى تعويد وإلف قريش على رحلتي الشتاء والصيف، وقد جاء ذلك في سورة قريش ﴿لِإِيلَافِ قُرَيْشٍ * إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ﴾"
          },
          {
            id: "q15",
            text: "كيف أثرت رحلتا الشتاء والصيف على مكانة قريش بين القبائل العربية؟",
            options: [
              { id: "a", text: "قللت من شأنهم" },
              { id: "b", text: "لم يكن لها تأثير" },
              { id: "c", text: "جعلتهم سادة التجارة ورفعت مكانتهم" },
              { id: "d", text: "أدت إلى عزلتهم عن باقي القبائل" }
            ],
            validationHash: btoa("c"),
            explanation: "أدت رحلتا الشتاء والصيف إلى جعل قريش سادة التجارة في شبه الجزيرة العربية ورفعت مكانتهم بين القبائل، وأصبحت مكة مركزاً تجارياً مهماً، مما عزز نفوذهم الاقتصادي والسياسي."
          }

        ]
      }

      case 'project-management':
        return {
          title: "Project Management Fundamentals",
          description: "Test your knowledge of project management principles and methodologies",
          questions: [
            {
              id: "q1",
              text: "What is the purpose of a project charter?",
              options: [
                { id: "a", text: "To list all project stakeholders" },
                { id: "b", text: "To formally authorize the project and provide the project manager with authority" },
                { id: "c", text: "To document all project requirements" },
                { id: "d", text: "To schedule project milestones" }
              ],
              validationHash: btoa("b"),
              explanation: "A project charter formally authorizes the existence of a project and provides the project manager with the authority to apply organizational resources to project activities. It serves as the formal documentation of the project's initiation and alignment with organizational objectives."
            },
            {
              id: "q2",
              text: "Which project management process group focuses on coordinating people and resources to carry out the project plan?",
              options: [
                { id: "a", text: "Initiating" },
                { id: "b", text: "Planning" },
                { id: "c", text: "Executing" },
                { id: "d", text: "Monitoring and Controlling" }
              ],
              validationHash: btoa("c"),
              explanation: "The Executing process group involves coordinating people and resources, as well as integrating and performing the activities of the project in accordance with the project management plan."
            },
            {
              id: "q3",
              text: "What is the critical path in project scheduling?",
              options: [
                { id: "a", text: "The shortest possible path to complete the project" },
                { id: "b", text: "The path with the most resources allocated" },
                { id: "c", text: "The sequence of activities that determines the earliest completion date" },
                { id: "d", text: "The most expensive path through the project" }
              ],
              validationHash: btoa("c"),
              explanation: "The critical path is the sequence of activities that represents the longest path through a project, which determines the shortest possible duration for the project. Any delay in an activity on the critical path directly impacts the project completion date."
            },
            {
              id: "q4",
              text: "What does the term 'scope creep' refer to in project management?",
              options: [
                { id: "a", text: "Gradual reduction in project scope" },
                { id: "b", text: "Uncontrolled expansion of project scope" },
                { id: "c", text: "Methodical approach to scope planning" },
                { id: "d", text: "Process of validating deliverables" }
              ],
              validationHash: btoa("b"),
              explanation: "Scope creep refers to the uncontrolled expansion or continuous growth of a project's scope without adjustments to time, cost, and resources. It typically occurs when requirements change or new requirements are added without going through proper change control processes."
            },
            {
              id: "q5",
              text: "Which of the following is NOT one of the five stages in the project management lifecycle according to PMBOK?",
              options: [
                { id: "a", text: "Initiating" },
                { id: "b", text: "Planning" },
                { id: "c", text: "Implementation" },
                { id: "d", text: "Closing" }
              ],
              validationHash: btoa("c"),
              explanation: "According to the Project Management Body of Knowledge (PMBOK), the five process groups are: Initiating, Planning, Executing, Monitoring and Controlling, and Closing. 'Implementation' is not one of the standard process groups."
            },
            {
              id: "q6",
              text: "What is a Gantt chart primarily used for?",
              options: [
                { id: "a", text: "Risk assessment" },
                { id: "b", text: "Budget allocation" },
                { id: "c", text: "Schedule visualization" },
                { id: "d", text: "Team performance evaluation" }
              ],
              validationHash: btoa("c"),
              explanation: "A Gantt chart is a bar chart that illustrates a project schedule. It shows the start and finish dates of project activities, their dependencies, and provides a visual timeline of the project. It's primarily used for schedule visualization and management."
            },
            {
              id: "q7",
              text: "The formula for calculating the Cost Performance Index (CPI) is:",
              options: [
                { id: "a", text: "Planned Value / Earned Value" },
                { id: "b", text: "Earned Value / Actual Cost" },
                { id: "c", text: "Actual Cost / Earned Value" },
                { id: "d", text: "Earned Value - Actual Cost" }
              ],
              validationHash: btoa("b"),
              explanation: "The Cost Performance Index (CPI) is calculated as Earned Value (EV) divided by Actual Cost (AC). A CPI greater than 1 indicates the project is under budget, while a CPI less than 1 indicates the project is over budget."
            },
            {
              id: "q8",
              text: "What is a stakeholder in project management?",
              options: [
                { id: "a", text: "Only the project team members" },
                { id: "b", text: "Only the project sponsors" },
                { id: "c", text: "Only the end users of the project" },
                { id: "d", text: "Any person or organization affected by or that can affect the project" }
              ],
              validationHash: btoa("d"),
              explanation: "A stakeholder is any individual, group, or organization that may affect, be affected by, or perceive itself to be affected by a decision, activity, or outcome of the project. This includes sponsors, customers, team members, and anyone with an interest in the project's outcome."
            },
            {
              id: "q9",
              text: "What is the purpose of a risk register in project management?",
              options: [
                { id: "a", text: "To document all completed project milestones" },
                { id: "b", text: "To track project expenses and budget allocation" },
                { id: "c", text: "To identify, assess, and track risks throughout the project" },
                { id: "d", text: "To list all project stakeholders and their contact information" }
              ],
              validationHash: btoa("c"),
              explanation: "A risk register is a document used to identify, assess, and track potential risks throughout the project lifecycle. It typically includes information about each risk, its probability and impact, response strategies, and ownership. It's a key tool for risk management."
            },
            {
              id: "q10",
              text: "Which project management methodology emphasizes delivering functional components of a project in short iterations?",
              options: [
                { id: "a", text: "Waterfall" },
                { id: "b", text: "Agile" },
                { id: "c", text: "Critical Path Method" },
                { id: "d", text: "PERT" }
              ],
              validationHash: btoa("b"),
              explanation: "Agile project management emphasizes delivering functional components of a project in short iterations (often 2-4 weeks). This approach allows for frequent reassessment and adaptation of plans, continuous improvement, and regular delivery of value to stakeholders."
            }
          ]
        };


case 'angular':
  return {
    title: "Angular Framework Fundamentals",
    description: "Test your knowledge of Angular concepts, features, and best practices",
    questions: [
      {
        id: "q1",
        text: "What is Angular and how is it different from AngularJS?",
        options: [
          { id: "a", text: "They are two names for the same framework" },
          { id: "b", text: "Angular is the updated version of AngularJS with TypeScript support and component-based architecture" },
          { id: "c", text: "Angular is a backend framework while AngularJS is for frontend" },
          { id: "d", text: "AngularJS supports TypeScript while Angular only supports JavaScript" }
        ],
        validationHash: btoa("b"),
        explanation: "Angular is a complete rewrite of AngularJS. Angular (version 2+) is a TypeScript-based open-source web application framework that uses a component-based architecture, while AngularJS (Angular 1.x) was JavaScript-based and used a controller-based architecture. Angular offers better performance, mobile support, and modern features."
      },
      {
        id: "q2",
        text: "What is a component in Angular?",
        options: [
          { id: "a", text: "A CSS file that styles the application" },
          { id: "b", text: "A TypeScript class with a template, styles, and specific functionality" },
          { id: "c", text: "A JavaScript function that handles HTTP requests" },
          { id: "d", text: "A database configuration file" }
        ],
        validationHash: btoa("b"),
        explanation: "In Angular, a component is a TypeScript class with the @Component decorator that associates it with a template (HTML), styles (CSS), and specific functionality. Components are the building blocks of Angular applications, representing a reusable UI element with its own logic and data."
      },
      {
        id: "q3",
        text: "What is the purpose of Angular modules?",
        options: [
          { id: "a", text: "To create CSS styles for components" },
          { id: "b", text: "To define routes for navigation" },
          { id: "c", text: "To group related components, directives, pipes, and services" },
          { id: "d", text: "To connect to external APIs" }
        ],
        validationHash: btoa("c"),
        explanation: "Angular modules (NgModules) are containers that group related components, directives, pipes, and services. They help organize an application into cohesive blocks of functionality. Every Angular application has at least one module, the root module (AppModule). Modules improve maintainability and enable features like lazy loading."
      },
      {
        id: "q4",
        text: "What is data binding in Angular?",
        options: [
          { id: "a", text: "A database connection feature" },
          { id: "b", text: "A technique for connecting a component's data to the DOM" },
          { id: "c", text: "A method to encrypt sensitive information" },
          { id: "d", text: "A way to bind CSS classes to HTML elements" }
        ],
        validationHash: btoa("b"),
        explanation: "Data binding in Angular is a technique that allows automatic synchronization of data between the component's class and its template (view). Angular supports four types of data binding: interpolation ({{}}), property binding ([property]), event binding ((event)), and two-way binding ([(ngModel)])."
      },
      {
        id: "q5",
        text: "What is the purpose of Angular services?",
        options: [
          { id: "a", text: "To render HTML templates" },
          { id: "b", text: "To define the application's styles" },
          { id: "c", text: "To share data and functionality across components" },
          { id: "d", text: "To configure routing" }
        ],
        validationHash: btoa("c"),
        explanation: "Angular services are singleton objects that provide specific functionality not directly related to views. They are used to share data, functionality, and business logic across different components in an application. Services are ideal for tasks like data fetching, logging, and business rules that need to be centralized and reused."
      },
      {
        id: "q6",
        text: "What is dependency injection in Angular?",
        options: [
          { id: "a", text: "A design pattern where a class requests dependencies from external sources" },
          { id: "b", text: "A way to inject CSS dependencies into HTML" },
          { id: "c", text: "A method to combine multiple components into one" },
          { id: "d", text: "A technique for loading JavaScript libraries" }
        ],
        validationHash: btoa("a"),
        explanation: "Dependency Injection (DI) is a design pattern in which a class requests dependencies from external sources rather than creating them. Angular has its own DI framework that provides dependencies to components, directives, pipes, and services. This pattern increases flexibility, modularity, and testability of applications."
      },
      {
        id: "q7",
        text: "What are Angular directives?",
        options: [
          { id: "a", text: "Special comments in HTML" },
          { id: "b", text: "Classes that add behavior to DOM elements" },
          { id: "c", text: "Methods that handle form submissions" },
          { id: "d", text: "Security features in Angular" }
        ],
        validationHash: btoa("b"),
        explanation: "Angular directives are classes that add additional behavior to elements in an Angular application. There are three types of directives: Component directives (with templates), Structural directives (change DOM layout, like *ngFor and *ngIf), and Attribute directives (change appearance or behavior of an element, like [ngStyle])."
      },
      {
        id: "q8",
        text: "What is the purpose of the Angular CLI?",
        options: [
          { id: "a", text: "To render component templates" },
          { id: "b", text: "To inject dependencies into components" },
          { id: "c", text: "To manage database connections" },
          { id: "d", text: "To automate tasks like project creation, building, testing, and deployment" }
        ],
        validationHash: btoa("d"),
        explanation: "The Angular CLI (Command Line Interface) is a tool that automates various development tasks including project creation, adding components/services/modules, building the application for production, running tests, and much more. It follows Angular best practices and helps maintain consistent project structure."
      },
      {
        id: "q9",
        text: "What is Angular routing?",
        options: [
          { id: "a", text: "A technique for network traffic management" },
          { id: "b", text: "A framework for navigating between different components/views" },
          { id: "c", text: "A method to route API calls to different servers" },
          { id: "d", text: "A way to organize CSS files" }
        ],
        validationHash: btoa("b"),
        explanation: "Angular routing is a framework for navigating between different components/views in an Angular application. It enables creating Single Page Applications (SPAs) where different URLs correspond to different components, without requiring full page reloads. The Angular Router provides features like lazy loading, route guards, and nested routing."
      },
      {
        id: "q10",
        text: "What is the purpose of Angular pipes?",
        options: [
          { id: "a", text: "To handle HTTP requests" },
          { id: "b", text: "To transform displayed values in templates" },
          { id: "c", text: "To connect components together" },
          { id: "d", text: "To create reusable UI elements" }
        ],
        validationHash: btoa("b"),
        explanation: "Angular pipes are a way to transform and format data in templates before displaying it to users. Built-in pipes include DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, and PercentPipe. Pipes can be chained and developers can create custom pipes for specific transformations. They help keep components clean by moving display logic to the template."
      }
    ]
  };



  case 'finance':
    return {
      title: "Financial Concepts and Knowledge",
      description: "Test your understanding of fundamental financial concepts and principles",
      questions: [
        {
          id: "q1",
          text: "What is the difference between stocks and bonds?",
          options: [
            { id: "a", text: "Stocks represent ownership while bonds represent debt" },
            { id: "b", text: "Stocks are low risk while bonds are high risk" },
            { id: "c", text: "Stocks provide fixed returns while bonds are variable" },
            { id: "d", text: "Stocks are issued by governments while bonds are issued by companies" }
          ],
          validationHash: btoa("a"),
          explanation: "Stocks represent ownership (equity) in a company, making stockholders partial owners who may receive dividends and benefit from price appreciation. Bonds represent debt - bondholders are lending money to the issuer (government or corporation) in exchange for regular interest payments and the return of principal at maturity."
        },
        {
          id: "q2",
          text: "What is the primary purpose of diversification in an investment portfolio?",
          options: [
            { id: "a", text: "To maximize returns" },
            { id: "b", text: "To minimize taxes" },
            { id: "c", text: "To reduce risk" },
            { id: "d", text: "To increase dividend income" }
          ],
          validationHash: btoa("c"),
          explanation: "The primary purpose of diversification is to reduce risk by spreading investments across various asset classes, sectors, and geographies. When properly diversified, poor performance in one investment can be offset by better performance in others, reducing the overall volatility and risk of the portfolio."
        },
        {
          id: "q3",
          text: "What does the P/E ratio measure?",
          options: [
            { id: "a", text: "Profit to expense ratio" },
            { id: "b", text: "Price to earnings ratio" },
            { id: "c", text: "Potential earnings growth" },
            { id: "d", text: "Profit and equity balance" }
          ],
          validationHash: btoa("b"),
          explanation: "P/E (Price to Earnings) ratio measures a company's current share price relative to its earnings per share (EPS). It indicates how much investors are willing to pay for each dollar of earnings. A high P/E could mean investors expect high growth rates in the future, while a low P/E might indicate a company is undervalued or experiencing problems."
        },
        {
          id: "q4",
          text: "What is compound interest?",
          options: [
            { id: "a", text: "Interest calculated only on the principal amount" },
            { id: "b", text: "Interest paid to multiple parties" },
            { id: "c", text: "Interest calculated on both principal and accumulated interest" },
            { id: "d", text: "Interest that compounds losses over time" }
          ],
          validationHash: btoa("c"),
          explanation: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This means you earn interest on interest, creating an exponential growth effect over time. This is why compound interest is often referred to as 'interest on interest' and is a powerful concept in wealth building."
        },
        {
          id: "q5",
          text: "What is the purpose of a central bank?",
          options: [
            { id: "a", text: "To maximize profits for private banks" },
            { id: "b", text: "To provide consumer banking services" },
            { id: "c", text: "To manage monetary policy and promote financial stability" },
            { id: "d", text: "To provide personal financial advice" }
          ],
          validationHash: btoa("c"),
          explanation: "Central banks (like the Federal Reserve in the US) are responsible for managing a nation's monetary policy, ensuring financial stability, supervising banking institutions, and providing financial services to the government. They control the money supply, set interest rates, and act as a lender of last resort during financial crises."
        },
        {
          id: "q6",
          text: "What is a bear market?",
          options: [
            { id: "a", text: "A market where prices are rising" },
            { id: "b", text: "A market where prices are falling" },
            { id: "c", text: "A market dominated by long-term investors" },
            { id: "d", text: "A market with low trading volume" }
          ],
          validationHash: btoa("b"),
          explanation: "A bear market refers to a market condition where prices are falling or expected to fall, typically defined as a 20% or greater decline from recent highs. Bear markets are often characterized by pessimism, negative investor sentiment, and a general economic slowdown. The opposite is a bull market, where prices are rising or expected to rise."
        },
        {
          id: "q7",
          text: "What is inflation?",
          options: [
            { id: "a", text: "The increase in a country's GDP" },
            { id: "b", text: "The general rise in prices and fall in purchasing power of money" },
            { id: "c", text: "The process of international trade expansion" },
            { id: "d", text: "The growth in corporate profits" }
          ],
          validationHash: btoa("b"),
          explanation: "Inflation is the general increase in prices of goods and services in an economy over time, resulting in a decrease in the purchasing power of money. It's typically measured as an annual percentage, such as through the Consumer Price Index (CPI). Moderate inflation is generally considered normal in a growing economy, but high inflation can erode savings and cause economic instability."
        },
        {
          id: "q8",
          text: "What is a 401(k) plan?",
          options: [
            { id: "a", text: "A type of life insurance policy" },
            { id: "b", text: "A government pension program" },
            { id: "c", text: "A tax-advantaged retirement savings plan sponsored by employers" },
            { id: "d", text: "A short-term investment fund" }
          ],
          validationHash: btoa("c"),
          explanation: "A 401(k) is a tax-advantaged retirement savings plan sponsored by employers in the United States. Employees can contribute a portion of their salary to the plan, often with employer matching contributions. These contributions typically grow tax-deferred until retirement. Traditional 401(k)s offer pre-tax contributions, while Roth 401(k)s allow after-tax contributions with tax-free withdrawals in retirement."
        },
        {
          id: "q9",
          text: "What is the difference between a traditional IRA and a Roth IRA?",
          options: [
            { id: "a", text: "There is no difference" },
            { id: "b", text: "Traditional IRAs are for employed people, Roth IRAs are for self-employed" },
            { id: "c", text: "Traditional IRA contributions are tax-deductible now but taxed at withdrawal; Roth IRA contributions are taxed now but tax-free at withdrawal" },
            { id: "d", text: "Traditional IRAs allow higher contribution limits than Roth IRAs" }
          ],
          validationHash: btoa("c"),
          explanation: "The key difference between Traditional and Roth IRAs is their tax treatment. With a Traditional IRA, contributions may be tax-deductible now, reducing current taxable income, but withdrawals in retirement are taxed as ordinary income. With a Roth IRA, contributions are made with after-tax dollars (no immediate tax benefit), but qualified withdrawals in retirement are completely tax-free, including earnings."
        },
        {
          id: "q10",
          text: "What is the efficient market hypothesis?",
          options: [
            { id: "a", text: "The theory that markets always move in predictable cycles" },
            { id: "b", text: "The idea that asset prices reflect all available information" },
            { id: "c", text: "The concept that government regulation improves market efficiency" },
            { id: "d", text: "The principle that market growth always matches economic growth" }
          ],
          validationHash: btoa("b"),
          explanation: "The Efficient Market Hypothesis (EMH) is a financial theory stating that asset prices reflect all available information, making it impossible to consistently outperform the market through stock selection or market timing. According to EMH, markets are 'efficient' because new information is quickly incorporated into prices, making it difficult to find undervalued or overvalued securities. The theory exists in weak, semi-strong, and strong forms."
        }
      ]
    };


    case 'marketing':
      return {
        title: "Marketing Fundamentals",
        description: "Test your knowledge of essential marketing concepts and strategies",
        questions: [
          {
            id: "q1",
            text: "What is the marketing mix (4Ps)?",
            options: [
              { id: "a", text: "Price, Product, Place, Promotion" },
              { id: "b", text: "People, Process, Place, Promotion" },
              { id: "c", text: "Positioning, Planning, Process, Performance" },
              { id: "d", text: "Profit, Production, Procurement, Publicity" }
            ],
            validationHash: btoa("a"),
            explanation: "The marketing mix, often called the 4Ps, consists of Product (what you sell), Price (how much you charge), Place (where and how you sell it), and Promotion (how you communicate with customers). It's a fundamental framework used to develop a marketing strategy."
          },
          {
            id: "q2",
            text: "What is market segmentation?",
            options: [
              { id: "a", text: "Dividing your product line into different categories" },
              { id: "b", text: "Dividing the market into distinct groups with similar needs or characteristics" },
              { id: "c", text: "Breaking down sales data by geographic region" },
              { id: "d", text: "Analyzing competitive products in the marketplace" }
            ],
            validationHash: btoa("b"),
            explanation: "Market segmentation is the process of dividing a broad consumer or business market into sub-groups based on shared characteristics. Common segmentation bases include demographic, geographic, psychographic, and behavioral factors. This allows companies to target specific customer groups with tailored marketing strategies."
          },
          {
            id: "q3",
            text: "What is a unique selling proposition (USP)?",
            options: [
              { id: "a", text: "A special limited-time discount" },
              { id: "b", text: "The factor that differentiates a product from its competitors" },
              { id: "c", text: "A unique distribution channel" },
              { id: "d", text: "A proprietary sales technique" }
            ],
            validationHash: btoa("b"),
            explanation: "A Unique Selling Proposition (USP) is the distinct and appealing idea that sets a product or service apart from competitors. It answers the customer's question: 'Why should I buy from you instead of your competitors?' An effective USP clearly communicates the unique benefit that only your product or company can provide."
          },
          {
            id: "q4",
            text: "What is the difference between B2B and B2C marketing?",
            options: [
              { id: "a", text: "B2B is online marketing, B2C is traditional marketing" },
              { id: "b", text: "B2B focuses on logic and ROI, B2C often appeals to emotions" },
              { id: "c", text: "B2B is free, B2C requires payment" },
              { id: "d", text: "B2B is for small businesses, B2C is for large corporations" }
            ],
            validationHash: btoa("b"),
            explanation: "B2B (Business-to-Business) marketing targets other businesses and often emphasizes logic, ROI, and business value, with longer sales cycles and relationship building. B2C (Business-to-Consumer) marketing targets individual consumers and frequently appeals to emotions, lifestyle benefits, and quick purchasing decisions."
          },
          {
            id: "q5",
            text: "What is content marketing?",
            options: [
              { id: "a", text: "Any form of paid advertising" },
              { id: "b", text: "The process of creating and distributing valuable content to attract and engage a target audience" },
              { id: "c", text: "Sending promotional emails to customers" },
              { id: "d", text: "Celebrity endorsements of products" }
            ],
            validationHash: btoa("b"),
            explanation: "Content marketing is a strategic approach focused on creating and distributing valuable, relevant, and consistent content (such as blogs, videos, podcasts, social media posts) to attract and retain a clearly defined audience. The goal is to drive profitable customer action by providing information that helps solve problems rather than explicitly promoting a brand."
          },
          {
            id: "q6",
            text: "What is brand equity?",
            options: [
              { id: "a", text: "The financial value of a company's brand" },
              { id: "b", text: "The total number of products under a brand" },
              { id: "c", text: "The level of customer awareness and perception that adds value to a product beyond its functional benefits" },
              { id: "d", text: "The percentage of market share a brand holds" }
            ],
            validationHash: btoa("c"),
            explanation: "Brand equity refers to the value a brand adds to a product beyond its functional benefits. It's the set of assets (or liabilities) linked to a brand's name and symbol that adds to (or subtracts from) the value provided by a product. Strong brand equity can lead to higher prices, customer loyalty, and resilience against competitors."
          },
          {
            id: "q7",
            text: "What is the purpose of a SWOT analysis in marketing?",
            options: [
              { id: "a", text: "To set specific sales targets" },
              { id: "b", text: "To determine product pricing" },
              { id: "c", text: "To evaluate a company's Strengths, Weaknesses, Opportunities, and Threats" },
              { id: "d", text: "To track website traffic sources" }
            ],
            validationHash: btoa("c"),
            explanation: "A SWOT analysis is a strategic planning tool used to identify and analyze internal Strengths and Weaknesses of an organization and external Opportunities and Threats. In marketing, it helps companies understand their competitive position, develop strategic plans, identify issues that affect business performance, and maximize strengths while addressing weaknesses."
          },
          {
            id: "q8",
            text: "What is the customer journey?",
            options: [
              { id: "a", text: "The physical distance customers travel to reach a store" },
              { id: "b", text: "The complete experience a customer has when interacting with a brand, from initial awareness to post-purchase" },
              { id: "c", text: "The shipping process for online orders" },
              { id: "d", text: "A loyalty program that rewards repeat customers" }
            ],
            validationHash: btoa("b"),
            explanation: "The customer journey is the complete sum of experiences that customers go through when interacting with a company and its brand. It spans all stages including awareness, consideration, purchase, retention, and advocacy. Mapping the customer journey helps marketers understand customer needs at each touchpoint and optimize the experience accordingly."
          },
          {
            id: "q9",
            text: "What is conversion rate in digital marketing?",
            options: [
              { id: "a", text: "The percentage of website visitors who take a desired action" },
              { id: "b", text: "The rate at which one currency converts to another" },
              { id: "c", text: "The speed at which a website loads" },
              { id: "d", text: "The frequency of content updates" }
            ],
            validationHash: btoa("a"),
            explanation: "Conversion rate is the percentage of visitors to a website who complete a desired goal (a conversion) out of the total number of visitors. A conversion can be any action you want users to take, such as making a purchase, signing up for a newsletter, downloading a resource, or filling out a contact form. It's a key metric for measuring the effectiveness of digital marketing efforts."
          },
          {
            id: "q10",
            text: "What is guerrilla marketing?",
            options: [
              { id: "a", text: "High-budget TV advertising campaigns" },
              { id: "b", text: "Marketing that targets military personnel" },
              { id: "c", text: "Unconventional, low-cost marketing strategies that yield maximum results" },
              { id: "d", text: "Aggressive competitive advertising" }
            ],
            validationHash: btoa("c"),
            explanation: "Guerrilla marketing refers to unconventional, creative marketing strategies designed to get maximum results from minimal resources. It often relies on surprise, personal interaction, and creating memorable experiences rather than traditional advertising methods. Examples include flash mobs, viral campaigns, street art, and unexpected public installations that generate buzz and word-of-mouth publicity."
          }
        ]
      };
    



      case 'social-marketing':
  return {
    title: "التسويق عبر وسائل التواصل الاجتماعي",
    description: "اختبر معرفتك بأساسيات وقواعد التسويق عبر منصات التواصل الاجتماعي",
    questions: [
      {
        id: "q1",
        text: "ما هي أهمية وجود استراتيجية محددة للتسويق عبر وسائل التواصل الاجتماعي؟",
        options: [
          { id: "a", text: "للحصول على أكبر عدد من المتابعين فقط" },
          { id: "b", text: "لتوفير الوقت في إنشاء المحتوى" },
          { id: "c", text: "لتحديد الأهداف وتوجيه الجهود وقياس النتائج" },
          { id: "d", text: "لمجاراة المنافسين في السوق فقط" }
        ],
        validationHash: btoa("c"),
        explanation: "وجود استراتيجية محددة للتسويق عبر وسائل التواصل الاجتماعي يساعد في تحديد الأهداف بوضوح، وتوجيه الجهود التسويقية بطريقة منظمة، وقياس النتائج بشكل دقيق. كما تساعد في تحديد الجمهور المستهدف والمنصات المناسبة ونوع المحتوى الذي يجب إنشاؤه."
      },
      {
        id: "q2",
        text: "ما هو مفهوم 'التسويق بالمحتوى' عبر وسائل التواصل الاجتماعي؟",
        options: [
          { id: "a", text: "نشر إعلانات مدفوعة بشكل مستمر" },
          { id: "b", text: "إنشاء ومشاركة محتوى قيم وملائم لجذب وإشراك الجمهور المستهدف" },
          { id: "c", text: "التركيز فقط على الصور والفيديوهات الجذابة" },
          { id: "d", text: "نشر منشورات يومية بغض النظر عن محتواها" }
        ],
        validationHash: btoa("b"),
        explanation: "التسويق بالمحتوى عبر وسائل التواصل الاجتماعي يعني إنشاء ومشاركة محتوى ذو قيمة ومفيد وملائم للجمهور المستهدف بهدف جذب انتباههم وإشراكهم وبناء علاقة معهم. المحتوى الجيد يساعد في بناء الثقة والولاء للعلامة التجارية وتحويل المتابعين إلى عملاء."
      },
      {
        id: "q3",
        text: "لماذا تعتبر معرفة الجمهور المستهدف أمراً ضرورياً للتسويق عبر وسائل التواصل الاجتماعي؟",
        options: [
          { id: "a", text: "لزيادة عدد المتابعين فقط" },
          { id: "b", text: "لتحديد أوقات النشر المثالية" },
          { id: "c", text: "لإنشاء محتوى يلبي احتياجاتهم واهتماماتهم ويناسب المنصات التي يستخدمونها" },
          { id: "d", text: "لتقليد استراتيجيات المنافسين بشكل أفضل" }
        ],
        validationHash: btoa("c"),
        explanation: "معرفة الجمهور المستهدف بدقة تمكنك من إنشاء محتوى يلبي احتياجاتهم واهتماماتهم الحقيقية، واختيار المنصات المناسبة التي يتواجدون عليها، وتحديد أفضل الأوقات للنشر، واستخدام اللغة والأسلوب المناسب لهم. هذا يؤدي إلى زيادة التفاعل وتحسين معدلات التحويل."
      },
      {
        id: "q4",
        text: "ما هي أهمية الاتساق في التسويق عبر وسائل التواصل الاجتماعي؟",
        options: [
          { id: "a", text: "يساعد على نشر نفس المحتوى على جميع المنصات" },
          { id: "b", text: "يبني هوية مميزة للعلامة التجارية ويعزز الاعتراف بها ويبني الثقة" },
          { id: "c", text: "يقلل من الحاجة إلى إنشاء محتوى جديد" },
          { id: "d", text: "يجعل عملية النشر أكثر سهولة فقط" }
        ],
        validationHash: btoa("b"),
        explanation: "الاتساق في الرسائل والهوية البصرية والأسلوب والنبرة عبر جميع منصات التواصل الاجتماعي يساعد في بناء هوية مميزة وقوية للعلامة التجارية. يعزز الاتساق الاعتراف بالعلامة التجارية ويبني الثقة مع الجمهور ويخلق انطباعاً احترافياً، مما يؤدي إلى زيادة الولاء والمبيعات."
      },
      {
        id: "q5",
        text: "ما هو مؤشر الأداء الرئيسي (KPI) الأكثر أهمية لقياس نجاح حملات التسويق عبر وسائل التواصل الاجتماعي؟",
        options: [
          { id: "a", text: "عدد المتابعين فقط" },
          { id: "b", text: "عدد الإعجابات والمشاركات" },
          { id: "c", text: "يعتمد على أهدافك التسويقية المحددة" },
          { id: "d", text: "عدد التعليقات فقط" }
        ],
        validationHash: btoa("c"),
        explanation: "مؤشرات الأداء الرئيسية (KPIs) يجب أن تعتمد على أهدافك التسويقية المحددة. إذا كان هدفك زيادة الوعي بالعلامة التجارية، فقد تكون المشاهدات والانطباعات مهمة. إذا كان هدفك المشاركة، فقد تركز على التفاعلات. وإذا كان هدفك المبيعات، فقد تكون معدلات التحويل والعائد على الاستثمار أكثر أهمية."
      },
      {
        id: "q6",
        text: "ما هي أفضل طريقة للتعامل مع التعليقات السلبية على منصات التواصل الاجتماعي؟",
        options: [
          { id: "a", text: "تجاهلها أو حذفها" },
          { id: "b", text: "الرد بمثلها بطريقة دفاعية" },
          { id: "c", text: "الاستجابة بسرعة واحترافية والسعي لحل المشكلة" },
          { id: "d", text: "منع المستخدمين الذين ينشرون تعليقات سلبية" }
        ],
        validationHash: btoa("c"),
        explanation: "التعامل الاحترافي مع التعليقات السلبية يتضمن الاستجابة بسرعة وبطريقة محترمة ومهنية، والاعتراف بالمشكلة، والسعي لحلها في أقرب وقت ممكن. هذا النهج يظهر للعملاء والمتابعين أن العلامة التجارية تهتم بتجربة العملاء وتسعى للتحسين المستمر."
      },
      {
        id: "q7",
        text: "ما هي ميزة استخدام أدوات جدولة المنشورات في التسويق عبر وسائل التواصل الاجتماعي؟",
        options: [
          { id: "a", text: "زيادة عدد المتابعين تلقائياً" },
          { id: "b", text: "تحسين معدل الظهور في محركات البحث" },
          { id: "c", text: "توفير الوقت والجهد وضمان اتساق النشر في الأوقات المثالية" },
          { id: "d", text: "لا توجد فائدة حقيقية لها" }
        ],
        validationHash: btoa("c"),
        explanation: "أدوات جدولة المنشورات تساعد في توفير الوقت والجهد من خلال إعداد المحتوى مسبقاً وجدولته للنشر في أوقات محددة. كما تساعد في ضمان اتساق النشر في الأوقات المثالية التي يكون فيها جمهورك نشطاً، حتى عندما تكون غير متواجد. بالإضافة إلى ذلك، توفر هذه الأدوات عادة تحليلات مفيدة لأداء المحتوى."
      },
      {
        id: "q8",
        text: "ما هو مفهوم 'التسويق المؤثر' في وسائل التواصل الاجتماعي؟",
        options: [
          { id: "a", text: "استخدام الإعلانات المدفوعة فقط" },
          { id: "b", text: "التعاون مع أشخاص لديهم جمهور كبير ومؤثر للترويج لمنتجك أو خدمتك" },
          { id: "c", text: "كتابة محتوى عاطفي ومؤثر" },
          { id: "d", text: "استخدام الصور والفيديوهات الجذابة فقط" }
        ],
        validationHash: btoa("b"),
        explanation: "التسويق المؤثر هو استراتيجية تعتمد على التعاون مع أفراد لديهم جمهور كبير وتأثير قوي على مواقع التواصل الاجتماعي (المؤثرين) للترويج لمنتجك أو خدمتك. يعتمد نجاح هذه الاستراتيجية على اختيار المؤثرين المناسبين الذين يتوافق جمهورهم مع جمهورك المستهدف وتتوافق قيمهم مع قيم علامتك التجارية."
      },
      {
        id: "q9",
        text: "ما هي أهمية استخدام الهاشتاغات في التسويق عبر وسائل التواصل الاجتماعي؟",
        options: [
          { id: "a", text: "لتزيين المنشورات فقط" },
          { id: "b", text: "زيادة وصول المحتوى واكتشافه من قبل الجمهور المستهدف" },
          { id: "c", text: "إظهار المعرفة بالاتجاهات الحالية" },
          { id: "d", text: "لا توجد أهمية حقيقية لها" }
        ],
        validationHash: btoa("b"),
        explanation: "الهاشتاغات تساعد في تصنيف المحتوى وتسهيل اكتشافه من قبل المستخدمين المهتمين بموضوع معين. استخدام الهاشتاغات المناسبة والمستهدفة يمكن أن يزيد من وصول منشوراتك إلى جمهور أوسع خارج متابعيك الحاليين، ويحسن فرص ظهور محتواك في نتائج البحث داخل المنصة."
      },
      {
        id: "q10",
        text: "ما هي أهمية تحليل البيانات والإحصاءات في التسويق عبر وسائل التواصل الاجتماعي؟",
        options: [
          { id: "a", text: "لمراقبة المنافسين فقط" },
          { id: "b", text: "للاطلاع على الأرقام لأغراض التقارير" },
          { id: "c", text: "فهم أداء المحتوى وسلوك الجمهور وتحسين الاستراتيجية باستمرار" },
          { id: "d", text: "لإثبات قيمة التسويق عبر وسائل التواصل الاجتماعي للإدارة" }
        ],
        validationHash: btoa("c"),
        explanation: "تحليل البيانات والإحصاءات يوفر رؤى قيمة حول أداء المحتوى، وسلوك الجمهور، وفعالية الاستراتيجية. هذه المعلومات تساعد في فهم ما ينجح وما لا ينجح، مما يمكنك من تحسين محتواك واستراتيجيتك باستمرار. مراقبة المقاييس المهمة مثل معدلات المشاركة ووصول المنشورات ومعدلات التحويل تساعدك في اتخاذ قرارات مبنية على البيانات وليس مجرد التخمين."
      }
    ]
  };


  case 'python':
  return {
    title: "Python Programming Fundamentals",
    description: "Test your knowledge of Python programming language basics",
    questions: [
      {
        id: "q1",
        text: "What is Python?",
        options: [
          { id: "a", text: "A compiled programming language" },
          { id: "b", text: "An interpreted, high-level, general-purpose programming language" },
          { id: "c", text: "A database management system" },
          { id: "d", text: "A web browser" }
        ],
        validationHash: btoa("b"),
        explanation: "Python is an interpreted, high-level, general-purpose programming language. It emphasizes code readability with its notable use of significant whitespace. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects."
      },
      {
        id: "q2",
        text: "How do you create a comment in Python?",
        options: [
          { id: "a", text: "// This is a comment" },
          { id: "b", text: "/* This is a comment */" },
          { id: "c", text: "# This is a comment" },
          { id: "d", text: "<!-- This is a comment -->" }
        ],
        validationHash: btoa("c"),
        explanation: "In Python, comments start with the hash character (#) and extend to the end of the physical line. Python doesn't have multi-line comment syntax like some other programming languages, but you can use triple quotes (''' or \"\"\") as multi-line strings, which can serve as documentation strings."
      },
      {
        id: "q3",
        text: "Which of the following data types is mutable in Python?",
        options: [
          { id: "a", text: "String" },
          { id: "b", text: "Tuple" },
          { id: "c", text: "List" },
          { id: "d", text: "Integer" }
        ],
        validationHash: btoa("c"),
        explanation: "Lists are mutable in Python, which means you can change their content without changing their identity. On the other hand, strings, tuples, and integers are immutable, meaning that once they're created, their values cannot be changed. If you modify an immutable object, Python creates a new object with the updated value."
      },
      {
        id: "q4",
        text: "What will be the output of the following code?\n\nx = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)",
        options: [
          { id: "a", text: "[1, 2, 3]" },
          { id: "b", text: "[1, 2, 3, 4]" },
          { id: "c", text: "[4, 1, 2, 3]" },
          { id: "d", text: "Error" }
        ],
        validationHash: btoa("b"),
        explanation: "In Python, when you assign a list to a variable, you're creating a reference to that list, not a copy. So when you set y = x, both variables refer to the same list object in memory. When you modify y by appending 4, you're also modifying x because they point to the same list. Therefore, the output is [1, 2, 3, 4]."
      },
      {
        id: "q5",
        text: "What is the purpose of the __init__ method in Python classes?",
        options: [
          { id: "a", text: "It initializes the class attributes and is called when a new instance of the class is created" },
          { id: "b", text: "It is used to delete the object" },
          { id: "c", text: "It is called when the program starts" },
          { id: "d", text: "It imports all necessary modules for the class" }
        ],
        validationHash: btoa("a"),
        explanation: "The __init__ method in Python is a special method (constructor) that is automatically called when a new instance of a class is created. It's used to initialize the attributes of the object. The first parameter is always 'self', which refers to the instance being created."
      },
      {
        id: "q6",
        text: "What is the correct way to open a file named 'example.txt' for reading in Python?",
        options: [
          { id: "a", text: "file = open('example.txt', 'r')" },
          { id: "b", text: "file = open('example.txt', 'w')" },
          { id: "c", text: "file = read('example.txt')" },
          { id: "d", text: "file = open('example.txt', 'read')" }
        ],
        validationHash: btoa("a"),
        explanation: "To open a file for reading in Python, you use the open() function with the file name and 'r' mode (which stands for read). The 'w' mode is for writing (and will truncate the file if it exists), 'a' is for appending, and 'r+' is for both reading and writing. The correct syntax is: file = open('example.txt', 'r')."
      },
      {
        id: "q7",
        text: "What does the following list comprehension produce?\n\n[x**2 for x in range(5)]",
        options: [
          { id: "a", text: "[0, 1, 4, 9, 16]" },
          { id: "b", text: "[1, 4, 9, 16, 25]" },
          { id: "c", text: "[0, 2, 4, 6, 8]" },
          { id: "d", text: "A syntax error" }
        ],
        validationHash: btoa("a"),
        explanation: "This list comprehension creates a list of squares for the numbers in range(5), which are 0, 1, 2, 3, and 4. The expression x**2 calculates the square of each number, resulting in [0, 1, 4, 9, 16]. List comprehensions provide a concise way to create lists based on existing lists or iterables."
      },
      {
        id: "q8",
        text: "What is the purpose of the 'self' parameter in Python class methods?",
        options: [
          { id: "a", text: "It refers to the class itself" },
          { id: "b", text: "It refers to the current instance of the class" },
          { id: "c", text: "It creates a new instance of the class" },
          { id: "d", text: "It is a keyword to access private variables" }
        ],
        validationHash: btoa("b"),
        explanation: "In Python class methods, the first parameter 'self' refers to the current instance of the class. It is used to access variables and methods associated with the instance. While 'self' is just a convention and not a keyword (you could use any name), it's a standard practice to use 'self' for clarity and readability."
      },
      {
        id: "q9",
        text: "What will be the output of the following code?\n\nprint(2 * 2 ** 3)",
        options: [
          { id: "a", text: "12" },
          { id: "b", text: "16" },
          { id: "c", text: "64" },
          { id: "d", text: "Error" }
        ],
        validationHash: btoa("b"),
        explanation: "In Python, the order of operations follows the PEMDAS rule (Parentheses, Exponents, Multiplication/Division, Addition/Subtraction). Here, 2 ** 3 is evaluated first (2 raised to the power of 3), which equals 8. Then 2 * 8 is evaluated, resulting in 16."
      },
      {
        id: "q10",
        text: "What is the purpose of Python's try...except statement?",
        options: [
          { id: "a", text: "To debug code" },
          { id: "b", text: "To handle and recover from exceptions" },
          { id: "c", text: "To define custom functions" },
          { id: "d", text: "To speed up execution" }
        ],
        validationHash: btoa("b"),
        explanation: "The try...except statement in Python is used for exception handling. It allows you to test a block of code for errors (the 'try' block) and handle those errors if they occur (the 'except' block). This prevents the program from crashing when it encounters an exception, allowing it to continue executing or gracefully exit."
      }
    ]
  };



  }// end of switch 

}


